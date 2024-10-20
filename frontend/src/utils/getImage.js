export const getImageUrl = (path) => {
  return new URL(`../assets/books/${path}`, import.meta.url);
};
