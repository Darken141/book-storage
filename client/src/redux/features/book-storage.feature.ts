import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IBook } from '@/types/book.types'

interface IBookStorage {
  books: IBook[]
  selectedBook: IBook | null
  searchQuery: string
  numberToDisplay: number
}

const initialNumberToDisplay = Number(process.env.NEXT_PUBLIC_NUMBER_TO_DISPLAY)
  ? Number(process.env.NEXT_PUBLIC_NUMBER_TO_DISPLAY)
  : 10

const initialState = {
  books: [],
  selectedBook: null,
  searchQuery: '',
  numberToDisplay: initialNumberToDisplay,
} as IBookStorage

export const bookStorage = createSlice({
  name: 'bookStorage',
  initialState,
  reducers: {
    reset: () => initialState,
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setNumberToDisplay: (state, action: PayloadAction<number>) => {
      state.numberToDisplay = action.payload
    },

    addBook: (state, action: PayloadAction<IBook>) => {
      state.books.push(action.payload)
    },
    updateBook: (state, action: PayloadAction<IBook>) => {
      const index = state.books.findIndex(
        (book) => book.id === action.payload.id
      )
      state.books[index] = action.payload
    },
    removeBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter((book) => book.id !== action.payload)
    },
    selectBook: (state, action: PayloadAction<string>) => {
      state.selectedBook =
        state.books.find((book) => book.id === action.payload) ?? null
    },
    clearSelectedBook: (state) => {
      state.selectedBook = null
    },
    sortAlphabeticallyAZ: (state) => {
      state.books.sort((a, b) => a.title.localeCompare(b.title))
    },
    sortAlphabeticallyZA: (state) => {
      state.books.sort((a, b) => b.title.localeCompare(a.title))
    },
  },
})

export const {
  addBook,
  setSearchQuery,
  setNumberToDisplay,
  updateBook,
  removeBook,
  selectBook,
  clearSelectedBook,
  sortAlphabeticallyAZ,
  sortAlphabeticallyZA,
  reset,
} = bookStorage.actions
export default bookStorage.reducer
