import storage from 'redux-persist/lib/storage'

import {
  persistReducer,
} from 'redux-persist'

import { rootReducer } from './reducers'

import { USER_SLICE_NAME } from './features/userSlice'
import { AUTH_SLICE_NAME } from './features/authSlice'
import { REMOTE_REQUEST_SLICE_NAME } from './features/remoteRequestSlice'


export const persistedReducer = persistReducer({
  key: 'xlite',
  version: 1,
  storage,
  whitelist: [
    AUTH_SLICE_NAME,
    USER_SLICE_NAME,
    REMOTE_REQUEST_SLICE_NAME,
    // TIMELINE_HOME_SLICE_NAME,
    // TIMELINE_PROFILE_SLICE_NAME
  ]
}, rootReducer)