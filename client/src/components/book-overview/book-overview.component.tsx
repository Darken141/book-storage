import { IBook } from '@/types/book.types'

import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

import styles from './book-overview.module.css'

export interface IProps {
  book: IBook
  onDeleteClick?: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void
  onEditClick?: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void
  onItemClick?: (e: React.MouseEvent<HTMLElement>, id: string) => void
}

export default function BookOverview({
  book,
  onDeleteClick,
  onEditClick,
  onItemClick,
}: IProps) {
  return (
    <article
      className={styles['item']}
      onClick={(e) => onItemClick && onItemClick(e, book.id)}
    >
      <header className={styles['item-header']}>
        <h3 className={styles['item-header-h3']}>{book.title}</h3>
        <div className={styles['icons']}>
          <button
            className="icon-button"
            onClick={(e) => onEditClick && onEditClick(e, book.id)}
          >
            <AiFillEdit />
          </button>
          <button
            className="icon-button"
            onClick={(e) => onDeleteClick && onDeleteClick(e, book.id)}
          >
            <AiFillDelete />
          </button>
        </div>
      </header>
      <main>
        <p>{book.description}</p>
      </main>
    </article>
  )
}
