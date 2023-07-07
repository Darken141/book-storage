import { configureStore } from '@reduxjs/toolkit'
import bookStorageReducer from './features/book-storage.feature'
import configReducer from './features/config.feature'

export const store = configureStore({
  reducer: {
    bookStorageReducer,
    configReducer,
  },
  devTools: process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
