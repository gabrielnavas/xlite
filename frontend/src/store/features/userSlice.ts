import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export const USER_SLICE_NAME = "user"

interface User {
  username: string
  email: string
  fullName: string
  createdAt: string
  roles: string[]
}

interface UserState {
  data: User
}

const initialState: UserState = {
  data: {
    username: "",
    email: "",
    fullName: "",
    createdAt: "",
    roles: []
  },
}

const UserSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      state.data = action.payload.user
    },
    resetUser: state => {
      state.data = {} as User
    }
  }
})

export default UserSlice.reducer
export const {
  setUser,
  resetUser
} = UserSlice.actions