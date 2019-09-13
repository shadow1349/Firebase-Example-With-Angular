import * as admin from "firebase-admin";

export const DeleteStorageBucketItem = function(url: string) {
  // We want to make sure we have a proper file path, rather than a URL normalized file path
  const filePath = url
    .split("/o/")[1]
    .split("?")[0]
    .replace(/%2F/g, "/");

  // Make sure that we delete the file
  return admin
    .storage()
    .bucket()
    .file(filePath)
    .delete();
};

export function GetFilePath(url: string) {
  return url
    .split("/o/")[1]
    .split("?")[0]
    .replace(/%2F/g, "/");
}

export async function checkStorageItemsAndDeleteOldFile(params: {
  before: string;
  after: string;
}) {
  // Make sure that both before and after logo image are not undefined
  if (params.before !== undefined && params.after !== undefined) {
    // split out the security token from the URL to compare the actual URL
    // otherwise the images will ALWAYS be different (every time a new document is uploaded,
    // even if it replaces a photo in the same path, it will have a new token)
    if (params.before.split("?")[0] !== params.after.split("?")[0]) {
      // If we have photos in a different URL then we will want to delete the old one to save space
      await DeleteStorageBucketItem(params.before);
    }
  }

  return Promise.resolve(null);
}
