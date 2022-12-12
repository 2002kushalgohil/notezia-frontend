import { noteziaApi } from "./Services/service";
import AuthSlice from "./Slices/Auth/AuthSlice";
import userSlice from "./Slices/User/userSlice";

const { configureStore, getDefaultMiddleware } = require("@reduxjs/toolkit");

export default configureStore({
  reducer: {
    auth: AuthSlice,
    user: userSlice,
    [noteziaApi.reducerPath]: noteziaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(noteziaApi.middleware),
});
