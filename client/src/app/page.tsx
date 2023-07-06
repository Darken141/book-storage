import BookForm from '@/components/book-form/book-form.component'

export default function Home() {
  return (
    <main>
      <div className="container grid-2">
        <section className="border">
          <h1>Form</h1>
          <BookForm />
        </section>
        <section className="border">
          <h1>List</h1>
        </section>
      </div>
    </main>
  )
}
