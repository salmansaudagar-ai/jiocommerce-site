import { getSanityWriteClient } from './client';

export async function publishToSanity(
  docType: string,
  docId: string,
  content: Record<string, unknown>
) {
  try {
    const result = await getSanityWriteClient().createOrReplace({
      _type: docType,
      _id: docId,
      ...content,
    });
    return result;
  } catch (error) {
    console.error('Error publishing to Sanity:', error);
    throw error;
  }
}

export async function publishDraft(
  docType: string,
  content: Record<string, unknown>
) {
  try {
    const draftId = `drafts.${Math.random().toString(36).slice(2)}`;
    const result = await getSanityWriteClient().create({
      _type: docType,
      _id: draftId,
      ...content,
    });
    return result;
  } catch (error) {
    console.error('Error publishing draft:', error);
    throw error;
  }
}

export async function deleteSanityDoc(docId: string) {
  try {
    await getSanityWriteClient().delete(docId);
    return { success: true, deletedId: docId };
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
}
