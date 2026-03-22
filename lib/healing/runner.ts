/**
 * Health Check Runner
 * Orchestrates all health checks and calculates health score
 */

import { saveHealthCheck } from '@/lib/supabase/health';
import { checkPlaceholders } from './checks/placeholder';
import { checkImages } from './checks/images';
import { checkLinks } from './checks/links';
import { checkFreshness } from './checks/freshness';
import { checkSEO } from './checks/seo';
import { checkSpelling } from './checks/spelling';
import type { HealthCheckRunResult, HealthIssue, HealthCheckDetail } from './types';

/**
 * Run all health checks
 * Calculates health score based on issue severity
 * Formula: 100 - (critical * 10) - (high * 5) - (medium * 2) - (low * 1)
 */
export async function runHealthChecks(): Promise<HealthCheckRunResult> {
  const checks: HealthCheckDetail[] = [];
  const allIssues: HealthIssue[] = [];

  let totalIssuesFixed = 0;
  let totalIssuesFlagged = 0;
  let totalIssuesFound = 0;

  // Run placeholder check
  try {
    console.log('Running placeholder check...');
    const result = await checkPlaceholders();
    checks.push({
      name: 'Placeholder Cleanup',
      passed: result.found === 0,
      issuesFound: result.found,
      issuesFixed: result.fixed,
      issuesFlagged: 0,
    });
    allIssues.push(...result.issues);
    totalIssuesFixed += result.fixed;
    totalIssuesFound += result.found;
  } catch (error) {
    console.error('Error in placeholder check:', error);
    checks.push({
      name: 'Placeholder Cleanup',
      passed: false,
      issuesFound: 0,
      issuesFixed: 0,
      issuesFlagged: 0,
    });
  }

  // Run image check
  try {
    console.log('Running image check...');
    const result = await checkImages();
    checks.push({
      name: 'Image Validation',
      passed: result.found === 0,
      issuesFound: result.found,
      issuesFixed: result.fixed,
      issuesFlagged: 0,
    });
    allIssues.push(...result.issues);
    totalIssuesFixed += result.fixed;
    totalIssuesFound += result.found;
  } catch (error) {
    console.error('Error in image check:', error);
    checks.push({
      name: 'Image Validation',
      passed: false,
      issuesFound: 0,
      issuesFixed: 0,
      issuesFlagged: 0,
    });
  }

  // Run link check
  try {
    console.log('Running link check...');
    const result = await checkLinks();
    checks.push({
      name: 'Link Validation',
      passed: result.found === 0,
      issuesFound: result.found,
      issuesFixed: result.fixed,
      issuesFlagged: 0,
    });
    allIssues.push(...result.issues);
    totalIssuesFixed += result.fixed;
    totalIssuesFound += result.found;
  } catch (error) {
    console.error('Error in link check:', error);
    checks.push({
      name: 'Link Validation',
      passed: false,
      issuesFound: 0,
      issuesFixed: 0,
      issuesFlagged: 0,
    });
  }

  // Run freshness check
  try {
    console.log('Running freshness check...');
    const result = await checkFreshness();
    checks.push({
      name: 'Content Freshness',
      passed: result.found === 0,
      issuesFound: result.found,
      issuesFixed: result.fixed,
      issuesFlagged: result.found,
    });
    allIssues.push(...result.issues);
    totalIssuesFlagged += result.found;
    totalIssuesFound += result.found;
  } catch (error) {
    console.error('Error in freshness check:', error);
    checks.push({
      name: 'Content Freshness',
      passed: false,
      issuesFound: 0,
      issuesFixed: 0,
      issuesFlagged: 0,
    });
  }

  // Run SEO check
  try {
    console.log('Running SEO check...');
    const result = await checkSEO();
    checks.push({
      name: 'SEO Validation',
      passed: result.found === 0,
      issuesFound: result.found,
      issuesFixed: result.fixed,
      issuesFlagged: result.found,
    });
    allIssues.push(...result.issues);
    totalIssuesFlagged += result.found;
    totalIssuesFound += result.found;
  } catch (error) {
    console.error('Error in SEO check:', error);
    checks.push({
      name: 'SEO Validation',
      passed: false,
      issuesFound: 0,
      issuesFixed: 0,
      issuesFlagged: 0,
    });
  }

  // Run spelling check
  try {
    console.log('Running spelling check...');
    const result = await checkSpelling();
    checks.push({
      name: 'Spelling Validation',
      passed: result.found === 0,
      issuesFound: result.found,
      issuesFixed: result.fixed,
      issuesFlagged: result.found,
    });
    allIssues.push(...result.issues);
    totalIssuesFlagged += result.found;
    totalIssuesFound += result.found;
  } catch (error) {
    console.error('Error in spelling check:', error);
    checks.push({
      name: 'Spelling Validation',
      passed: false,
      issuesFound: 0,
      issuesFixed: 0,
      issuesFlagged: 0,
    });
  }

  // Calculate health score
  // Formula: 100 - (critical * 10) - (high * 5) - (medium * 2) - (low * 1)
  let healthScore = 100;

  const criticalCount = allIssues.filter(
    (i) => i.severity === 'critical'
  ).length;
  const highCount = allIssues.filter((i) => i.severity === 'high').length;
  const mediumCount = allIssues.filter((i) => i.severity === 'medium').length;
  const lowCount = allIssues.filter((i) => i.severity === 'low').length;

  healthScore -= criticalCount * 10;
  healthScore -= highCount * 5;
  healthScore -= mediumCount * 2;
  healthScore -= lowCount * 1;

  // Ensure score is between 0-100
  healthScore = Math.max(0, Math.min(100, healthScore));

  const result: HealthCheckRunResult = {
    issues_found: totalIssuesFound,
    issues_fixed: totalIssuesFixed,
    issues_flagged: totalIssuesFlagged,
    health_score: healthScore,
    checks,
    details: {
      by_severity: {
        critical: criticalCount,
        high: highCount,
        medium: mediumCount,
        low: lowCount,
      },
      all_issues: allIssues,
    },
  };

  // Save to health checks table
  try {
    await saveHealthCheck(result);
  } catch (error) {
    console.error('Error saving health check result:', error);
  }

  return result;
}
