import { noteziaApi } from "./Services/service";
import AuthSlice from "./Slices/Auth/AuthSlice";

const { configureStore, getDefaultMiddleware } = require("@reduxjs/toolkit");

export default configureStore({
  reducer: {
    auth: AuthSlice,
    [noteziaApi.reducerPath]: noteziaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(noteziaApi.middleware),
});
