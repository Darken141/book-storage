import { IBook } from '@/types/book.types'

export function searchAndHighlight(query: string, arr: IBook[]): IBook[] {
  const searchRegex = new RegExp(`(${query})`, 'gi')

  const matchedObjects = arr.filter((obj) => obj.title.match(searchRegex))

  const highlightedObjects = matchedObjects.map((obj) => {
    const highlightedTitle = obj.title.replace(
      searchRegex,
      '<span class="highlight">$1</span>'
    )
    return {
      ...obj,
      title: highlightedTitle,
    }
  })

  highlightedObjects.sort((a, b) => a.title.localeCompare(b.title))

  return highlightedObjects
}

export const booksSeed = [
  {
    id: '1',
    title: 'The Lord of the Rings - The Fellowship of the Ring',
    description:
      'The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien.',
  },
  {
    id: '2',
    title: 'The Hobbit - There and Back Again',
    description:
      'The Hobbit, or There and Back Again is a childrens fantasy novel by English author J. R. R. Tolkien.',
  },
  {
    id: '3',
    title: 'The Silmarillion',
    description:
      'The Silmarillion is a collection of mythopoeic works by English writer J. R. R. Tolkien, edited and published posthumously by his son, Christopher Tolkien, in 1977, with assistance from Guy Gavriel Kay.',
  },
  {
    id: '4',
    title: 'The Children of Húrin',
    description:
      'The Children of Húrin is an epic fantasy novel which forms the completion of a tale by J. R. R. Tolkien. He wrote the original version of the story in the late 1910s, revised it several times later, but did not complete it before his death in 1973.',
  },
  {
    id: '5',
    title: 'The Fall of Gondolin',
    description:
      'The Fall of Gondolin is, in the writings of J.R.R. Tolkien, one of the original Lost Tales which formed the basis for a section in his later work, The Silmarillion. A stand-alone, book-length version of the story was published on 30 August 2018.',
  },
]
