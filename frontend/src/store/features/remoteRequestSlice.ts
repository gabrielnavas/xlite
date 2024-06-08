import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export const REMOTE_REQUEST_SLICE_NAME = "remoteRequest"

type RemoteRequestState = {
  isLoading: boolean
  successMessage: string
  errorMessage: string
  warningMessage: string
  infoMessage: string
}

const initialState: RemoteRequestState = {
  isLoading: false,
  successMessage: "",
  errorMessage: "",
  warningMessage: "",
  infoMessage: "",
}

const remoteRequestSlice = createSlice({
  name: REMOTE_REQUEST_SLICE_NAME,
  initialState,
  reducers: {
    remoteRequest: state => {
      state.isLoading = true
    },
    remoteFinish: state => {
      state.isLoading = initialState.isLoading
      state.successMessage = initialState.successMessage
      state.errorMessage = initialState.errorMessage
      state.warningMessage = initialState.warningMessage
      state.infoMessage = initialState.infoMessage
    },
    successMessage: (state, action: PayloadAction<{ message: string }>) => {
      state.isLoading = false
      state.successMessage = action.payload.message
      state.errorMessage = ""
    },
    failedMessage: (state, action: PayloadAction<{ message: string }>) => {
      state.isLoading = false
      state.errorMessage = action.payload.message
    },
    warningMessage: (state, action: PayloadAction<{ message: string }>) => {
      state.isLoading = false
      state.warningMessage = action.payload.message
    },
    infoMessage: (state, action: PayloadAction<{ message: string }>) => {
      state.isLoading = false
      state.infoMessage = action.payload.message
    },
  }
})

export default remoteRequestSlice.reducer
export const {
  remoteRequest,
  remoteFinish,
  successMessage,
  failedMessage,
  warningMessage,
  infoMessage
} = remoteRequestSlice.actions