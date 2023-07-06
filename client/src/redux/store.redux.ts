import { configureStore } from '@reduxjs/toolkit'
import bookStorageReducer from './features/book-storage.feature'

export const store = configureStore({
  reducer: {
    bookStorageReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
