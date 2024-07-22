import React from 'react';
import styles from './Pagination.module.scss';
import { PaginationProps } from './Pagination.type';

const { pagination, pagination__buttons, pagination__current } = styles;

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className={pagination}>
      <button
        className={pagination__buttons}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span
        className={pagination__current}
      >{`${currentPage} of ${totalPages} `}</span>
      <button
        className={pagination__buttons}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;