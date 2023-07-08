import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IConfig {
  isUpdating: boolean
}

const initialState = {
  isUpdating: false,
} as IConfig

export const config = createSlice({
  name: 'config',
  initialState,
  reducers: {
    reset: () => initialState,
    setIsUpdating: (state, action: PayloadAction<boolean>) => {
      state.isUpdating = action.payload
    },
  },
})

export const { reset, setIsUpdating } = config.actions
export default config.reducer
