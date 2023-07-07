import BookForm from '@/components/book-form/book-form.component'
import BookList from '@/components/book-list/book-list.component'

export default function Home() {
  return (
    <main>
      <h1 className="heading">BOOK STORAGE</h1>

      <div className="container grid-2">
        <section className="">
          <BookForm />
        </section>
        <section className="">
          <BookList />
        </section>
      </div>
    </main>
  )
}
