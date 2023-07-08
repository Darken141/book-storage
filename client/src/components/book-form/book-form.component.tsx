'use client'
import { useFormik } from 'formik'

import { useEffect } from 'react'
import Input from '@/components/input/input.component'
import Textarea from '@/components/textarea/textarea.component'
import Button from '@/components/button/button.component'

import { useAppDispatch, useAppSelector } from '@/redux/hooks.redux'
import {
  addBook,
  updateBook,
  clearSelectedBook,
} from '@/redux/features/book-storage.feature'
import { setIsUpdating } from '@/redux/features/config.feature'

import styles from './book-form.module.css'

import * as Yup from 'yup'

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  author: Yup.string(),
  description: Yup.string().max(300, 'Description is too long'),
})

export interface IInitialValues {
  title: string
  author: string
  description: string
}

export default function BookForm() {
  const { selectedBook } = useAppSelector((state) => state.bookStorageReducer)
  const { isUpdating } = useAppSelector((state) => state.configReducer)
  const dispatch = useAppDispatch()

  const initialValues: IInitialValues = {
    title: '',
    author: '',
    description: '',
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (isUpdating && selectedBook) {
        dispatch(
          updateBook({
            id: selectedBook?.id,
            ...values,
          })
        )
        dispatch(clearSelectedBook())
        dispatch(setIsUpdating(false))
      } else {
        dispatch(
          addBook({
            id: Date.now().toString(),
            ...values,
          })
        )
      }

      resetForm()
      setSubmitting(false)
    },
  })

  const { setValues, resetForm } = formik

  const onCancelClick = () => {
    dispatch(clearSelectedBook())
    dispatch(setIsUpdating(false))
    resetForm()
  }

  useEffect(() => {
    if (isUpdating && selectedBook) {
      setValues({
        title: selectedBook.title,
        author: selectedBook.author,
        description: selectedBook.description,
      })
    }
  }, [isUpdating, selectedBook, setValues])

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        type="text"
        name="title"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
        err={formik.errors.title}
        label="Title*"
        placeholder="The Lord of the Rings"
        required
      />
      <Input
        type="text"
        name="author"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.author}
        err={formik.errors.author}
        label="Author"
        placeholder="J. R. R. Tolkien"
      />
      <Textarea
        name="description"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
        err={formik.errors.description}
        label="Description"
        placeholder="The Lord of the Rings is an epic high fantasy novel by the English author and scholar J. R. R. Tolkien. Set in Middle-earth..."
        rows={10}
      />
      <div className={styles['buttons']}>
        <Button
          type="submit"
          disabled={formik.isSubmitting}
          className="primary"
        >
          {isUpdating ? 'Update book' : 'Add book'}
        </Button>
        {isUpdating && (
          <Button
            type="button"
            onClick={onCancelClick}
            disabled={formik.isSubmitting}
            className="outline"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
