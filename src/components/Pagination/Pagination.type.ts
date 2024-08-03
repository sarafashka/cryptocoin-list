export type PaginationProps = {
  currentPage: string;
  totalPages: number;
  onPageChange: (page: number) => void;
};
