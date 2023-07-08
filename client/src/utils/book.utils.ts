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
    id: '001',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    description:
      'The Catcher in the Rye is a novel by J.D. Salinger. It follows Holden Caulfield, a disaffected teenager who wanders the streets of New York City, questioning the phoniness of the adult world and searching for authenticity.',
  },
  {
    id: '002',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description:
      'To Kill a Mockingbird is a novel by Harper Lee. Set in the 1930s in the fictional town of Maycomb, Alabama, the story explores racial injustice and moral growth through the eyes of Scout Finch, a young girl.',
  },
  {
    id: '003',
    title: '1984',
    author: 'George Orwell',
    description:
      "1984 is a dystopian novel by George Orwell. It depicts a totalitarian society in which the government controls every aspect of people's lives. The novel explores themes of surveillance, censorship, and the power of language.",
  },
  {
    id: '004',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    description:
      'Pride and Prejudice is a classic novel by Jane Austen. It follows the story of Elizabeth Bennet as she navigates issues of love, class, and societal expectations in 19th-century England.',
  },
  {
    id: '005',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description:
      'The Great Gatsby is a novel by F. Scott Fitzgerald set in the Roaring Twenties. It explores themes of wealth, love, and the corruption of the American Dream through the eyes of the enigmatic Jay Gatsby.',
  },
  {
    id: '006',
    title: 'Moby-Dick',
    author: 'Herman Melville',
    description:
      "Moby-Dick is an epic novel by Herman Melville. It tells the story of Captain Ahab's relentless pursuit of the great white whale, Moby Dick, and explores themes of obsession, fate, and the nature of evil.",
  },
  {
    id: '007',
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    description:
      'The Lord of the Rings is a fantasy trilogy by J.R.R. Tolkien. Set in the world of Middle-earth, it follows the quest of Frodo Baggins to destroy the One Ring and defeat the Dark Lord Sauron.',
  },
  {
    id: '008',
    title: 'Jane Eyre',
    author: 'Charlotte Brontë',
    description:
      'Jane Eyre is a novel by Charlotte Brontë. It tells the story of Jane Eyre, an orphan who becomes a governess and falls in love with her employer, Mr. Rochester. The novel explores themes of love, independence, and social class.',
  },
  {
    id: '009',
    title: 'Brave New World',
    author: 'Aldous Huxley',
    description:
      'Brave New World is a dystopian novel by Aldous Huxley. Set in a future society where humans are genetically engineered and controlled, it examines the dangers of technology, consumerism, and loss of individuality.',
  },
  {
    id: '010',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    description:
      'The Hobbit is a fantasy novel by J.R.R. Tolkien. It follows the adventures of Bilbo Baggins, a hobbit who is recruited by the wizard Gandalf to join a group of dwarves on a quest to reclaim their homeland from the dragon Smaug.',
  },
]
