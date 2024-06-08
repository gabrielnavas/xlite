import { combineReducers } from "@reduxjs/toolkit";

import userSlice from "./features/userSlice";
import remoteRequestSlice from "./features/remoteRequestSlice";
import authSlice from "./features/authSlice";
import postsSlice from "./features/postsSlice";

export const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  posts: postsSlice,
  remoteRequest: remoteRequestSlice,
})