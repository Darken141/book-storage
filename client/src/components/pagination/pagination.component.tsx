'use client'
import { useState } from 'react'

import styles from './pagination.module.css'

interface PaginationProps {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (pageNumber: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handleClick = (pageNumber: number) => {
    onPageChange(pageNumber)
  }

  const renderPageNumbers = () => {
    const pageNumbers = []

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`${styles['pagination-item']} ${
            i === currentPage ? styles['pagination-item__active'] : ''
          }`}
          onClick={() => handleClick(i)}
        >
          {i}
        </li>
      )
    }

    return pageNumbers
  }

  return <ul className={styles['pagination']}>{renderPageNumbers()}</ul>
}

export default Pagination
