'use client'

import { useState } from 'react'
import {
  removeBook,
  selectBook,
  clearSelectedBook,
} from '@/redux/features/book-storage.feature'
import { setIsUpdating } from '@/redux/features/config.feature'
import { useAppDispatch, useAppSelector } from '@/redux/hooks.redux'

import { AnimatePresence } from 'framer-motion'
import BookOverview from '@/components/book-overview/book-overview.component'
import Modal from '@/components/modal/modal.component'

import styles from './book-list.module.css'

export default function BookList() {
  const { books, selectedBook } = useAppSelector(
    (state) => state.bookStorageReducer
  )
  const dispatch = useAppDispatch()
  const [state, setState] = useState({
    showModal: false,
  })

  const onCloseModal = () => {
    setState({ showModal: false })
    dispatch(clearSelectedBook())
  }

  return (
    <>
      <div className={styles['list']}>
        {books.map((book) => (
          <BookOverview
            key={book.id}
            book={book}
            onItemClick={(e, id) => {
              setState({ showModal: true })
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
