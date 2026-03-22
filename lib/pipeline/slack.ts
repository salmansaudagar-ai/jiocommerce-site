/**
 * Slack Message Ingestion Pipeline
 * Scans Slack channels for content and tracks ingestion state
 */

import { getSupabaseAdmin } from '@/lib/supabase/client';

export interface SlackMessage {
  id: string;
  channel: string;
  text: string;
  user?: string;
  timestamp: string;
}

/**
 * Scan Slack channels for new messages
 * Tracks last scan timestamp in Supabase
 */
export async function scanSlackChannels(): Promise<SlackMessage[]> {
  const slackToken = process.env.SLACK_BOT_TOKEN;
  const channelsEnv = process.env.SLACK_CHANNELS;

  if (!slackToken) {
    throw new Error('Missing SLACK_BOT_TOKEN environment variable');
  }

  if (!channelsEnv) {
    throw new Error('Missing SLACK_CHANNELS environment variable');
  }

  const channels = channelsEnv.split(',').map((ch) => ch.trim());
  const messages: SlackMessage[] = [];

  // Get last scan timestamp from Supabase kv-like storage
  const lastScanRecord = await getLastScanTime();
  const oldestTimestamp = lastScanRecord
    ? Math.floor(new Date(lastScanRecord).getTime() / 1000)
    : Math.floor((Date.now() - 24 * 60 * 60 * 1000) / 1000); // Default: last 24 hours

  // Scan each channel
  for (const channel of channels) {
    try {
      const params = new URLSearchParams({
        channel,
        oldest: oldestTimestamp.toString(),
        limit: '100',
      });

      const historyResponse = await fetch(
        `https://slack.com/api/conversations.history?${params}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${slackToken}`,
          },
        }
      );

      const data = (await historyResponse.json()) as any;

      if (!data.ok) {
        console.error(`Failed to fetch channel ${channel}:`, data.error);
        continue;
      }

      if (data.messages && Array.isArray(data.messages)) {
        for (const msg of data.messages) {
          // Skip bot messages and thread replies at top level
          if (
            msg.subtype === 'bot_message' ||
            msg.bot_id ||
            !msg.text
          ) {
            continue;
          }

          messages.push({
            id: `${channel}_${msg.ts}`,
            channel,
            text: msg.text,
            user: msg.user,
            timestamp: new Date(parseInt(msg.ts) * 1000).toISOString(),
          });
        }
      }
    } catch (error) {
      console.error(`Error scanning channel ${channel}:`, error);
      continue;
    }
  }

  // Update last scan timestamp
  await updateLastScanTime();

  return messages;
}

/**
 * Get last scan time from Supabase kv storage
 */
async function getLastScanTime(): Promise<string | null> {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data } = await supabaseAdmin
      .from('kv_store')
      .select('value')
      .eq('key', 'slack_last_scan')
      .single();

    if (data && 'value' in data) {
      return (data as any).value || null;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Update last scan time in Supabase kv storage
 */
async function updateLastScanTime(): Promise<void> {
  const now = new Date().toISOString();

  try {
    const supabaseAdmin = getSupabaseAdmin() as any;
    // Try to update first
    const { error: updateError } = await supabaseAdmin
      .from('kv_store')
      .update({ value: now })
      .eq('key', 'slack_last_scan');

    if (updateError && updateError.code === 'PGRST116') {
      // Record doesn't exist, insert it
      await supabaseAdmin.from('kv_store').insert({
        key: 'slack_last_scan',
        value: now,
      });
    } else if (updateError) {
      throw updateError;
    }
  } catch (error) {
    console.error('Error updating last scan time:', error);
  }
}
