import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export const AUTH_SLICE_NAME = "auth"

interface AuthState {
  token: string
  isAuth: boolean
}

const initialState: AuthState = {
  token: "",
  isAuth: false,
}

const AuthSlice = createSlice({
  name: AUTH_SLICE_NAME,
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token
      state.isAuth = true
    },
    logout: state => {
      state.isAuth = false
      state.token = ''
    }
  }
})

export default AuthSlice.reducer
export const {
  login,
  logout
} = AuthSlice.actions