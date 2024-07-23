export const getTotalPagesNumber = (pagesCount: number, perPage: number) => {
  return pagesCount ? Math.ceil(pagesCount / perPage) : 0;
};
