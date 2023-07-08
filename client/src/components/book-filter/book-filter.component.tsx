'use client'

import { useFormik } from 'formik'
import { useEffect } from 'react'
import Input from '../input/input.component'
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'

import { useDebounce } from '@/hooks/debounce.hook'
import { useAppDispatch, useAppSelector } from '@/redux/hooks.redux'
import {
  sortAlphabeticallyAZ,
  sortAlphabeticallyZA,
  setSearchQuery,
  setNumberToDisplay,
} from '@/redux/features/book-storage.feature'

import styles from './book-filter.module.css'

export default function BookFilter() {
  const numberToDisplay = useAppSelector(
    (state) => state.bookStorageReducer.numberToDisplay
  )
  const dispatch = useAppDispatch()

  const initialValues = {
    searchQuery: '',
    numberToDisplay: numberToDisplay,
  }

  const formik = useFormik({
    initialValues,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      resetForm()
      setSubmitting(false)
    },
  })

  const debouncedSearchQuery = useDebounce<string>(
    formik.values.searchQuery,
    500
  )

  const debouncedNumberToDisplay = useDebounce<number>(
    +formik.values.numberToDisplay,
    500
  )

  const onSortAZ = () => {
    dispatch(sortAlphabeticallyAZ())
  }

  const onSortZA = () => {
    dispatch(sortAlphabeticallyZA())
  }

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearchQuery))
  }, [debouncedSearchQuery, dispatch])

  useEffect(() => {
    dispatch(setNumberToDisplay(debouncedNumberToDisplay || 10))
  }, [debouncedNumberToDisplay, dispatch])

  return (
    <form className={styles['container']}>
      <Input
        type="search"
        name="searchQuery"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.searchQuery}
        err={formik.errors.searchQuery}
        label="Search by title"
        placeholder="Search..."
      />
      <div className={styles['icons']}>
        <button onClick={onSortAZ} type="button" className={`icon-button`}>
          <AiOutlineSortAscending />
        </button>
        <button onClick={onSortZA} type="button" className={`icon-button`}>
          <AiOutlineSortDescending />
        </button>
      </div>
      <Input
        type="number"
        name="numberToDisplay"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.numberToDisplay}
        err={formik.errors.numberToDisplay}
        min={0}
        max={999}
        label="#"
        style={{
          textAlign: 'center',
        }}
      />
    </form>
  )
}
