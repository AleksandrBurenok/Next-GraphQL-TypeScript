export const removeCategoryFromUri = (uri: string) =>
  uri.replace(/\/category\//gi, '');
