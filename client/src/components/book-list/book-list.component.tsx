'use client'

import { useState, useMemo, useEffect } from 'react'
import {
  removeBook,
  selectBook,
  clearSelectedBook,
  addBook,
} from '@/redux/features/book-storage.feature'
import { setIsUpdating } from '@/redux/features/config.feature'
import { useAppDispatch, useAppSelector } from '@/redux/hooks.redux'
import { searchAndHighlight, booksSeed } from '@/utils/book.utils'

import { AnimatePresence } from 'framer-motion'
import BookOverview from '@/components/book-overview/book-overview.component'
import Modal from '@/components/modal/modal.component'
import { EmptyList } from '@/components/empty-list/empty-list.component'
import Pagination from '@/components/pagination/pagination.component'

import styles from './book-list.module.css'

export default function BookList() {
  const { books, selectedBook, searchQuery, numberToDisplay } = useAppSelector(
    (state) => state.bookStorageReducer
  )
  const dispatch = useAppDispatch()
  const [state, setState] = useState({
    showModal: false,
    page: 1,
  })

  const onCloseModal = () => {
    setState((prevValue) => ({ ...prevValue, showModal: false }))
    dispatch(clearSelectedBook())
  }

  const addSeedData = () => {
    booksSeed.forEach((book) => {
      dispatch(addBook(book))
    })
  }

  const handlePageChange = (pageNumber: number) => {
    console.log(pageNumber)
    setState((prevValue) => ({ ...prevValue, page: pageNumber }))
  }

  const startPageSlice = useMemo(
    () => (state.page - 1) * numberToDisplay,
    [numberToDisplay, state.page]
  )
  const endPageSlice = useMemo(
    () => state.page * numberToDisplay,
    [numberToDisplay, state.page]
  )

  const booksToDisplay = searchQuery
    ? searchAndHighlight(searchQuery, books).slice(0, numberToDisplay)
    : books.slice(startPageSlice, endPageSlice)

  useEffect(() => {
    setState((prevValue) => ({ ...prevValue, page: 1 }))
  }, [searchQuery, numberToDisplay])

  return (
    <>
      <div className={styles['list']}>
        {booksToDisplay.length === 0 && (
          <EmptyList
            showAddButton={books.length === 0}
            onAddClick={addSeedData}
          />
        )}
        {booksToDisplay.map((book) => (
          <BookOverview
            key={book.id}
            book={book}
            onItemClick={(e, id) => {
              setState((prevValue) => ({ ...prevValue, showModal: true }))
              dispatch(selectBook(id))
            }}
            onDeleteClick={(e, id) => {
              e.stopPropagation()
              dispatch(removeBook(id))
            }}
            onEditClick={(e, id) => {
              e.stopPropagation()
              dispatch(selectBook(id))
              dispatch(setIsUpdating(true))
            }}
          />
        ))}
      </div>

      {!searchQuery && (
        <Pagination
          currentPage={state.page}
          totalItems={books.length}
          itemsPerPage={numberToDisplay}
          onPageChange={handlePageChange}
        />
      )}

      <AnimatePresence>
        {state.showModal && selectedBook && (
          <Modal key="modal" onClose={onCloseModal}>
            <div className={styles['modal-wrapper']}>
              <h2>{selectedBook.title}</h2>
              <p>{selectedBook.description}</p>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}
