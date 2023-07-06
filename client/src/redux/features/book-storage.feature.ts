import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IBook } from '@/types/book.types'

interface IBookStorage {
  books: IBook[]
}

const initialState = {
  books: [],
} as IBookStorage

export const bookStorage = createSlice({
  name: 'bookStorage',
  initialState,
  reducers: {
    reset: () => initialState,
    addBook: (state, action: PayloadAction<IBook>) => {
      state.books.push(action.payload)
    },
    removeBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter((book) => book.id !== action.payload)
    },
    sortAlphabeticallyAZ: (state) => {
      state.books.sort((a, b) => a.title.localeCompare(b.title))
    },
    sortAlphabeticallyZA: (state) => {
      state.books.sort((a, b) => b.title.localeCompare(a.title)).reverse()
    },
  },
})

export const {
  addBook,
  removeBook,
  sortAlphabeticallyAZ,
  sortAlphabeticallyZA,
  reset,
} = bookStorage.actions
export default bookStorage.reducer
