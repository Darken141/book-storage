'use client'
import { Formik } from 'formik'

export interface IInitialValues {
  title: string
  description: string
}

export default function BookForm() {
  const initialValues: IInitialValues = {
    title: '',
    description: '',
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 400)
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
          />
          {errors.title && touched.title && errors.title}
          <textarea
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
          />
          {errors.description && touched.description && errors.description}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  )
}
