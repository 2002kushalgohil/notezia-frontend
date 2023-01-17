import { noteziaApi } from "./Services/service";
import AuthSlice from "./Slices/Auth/AuthSlice";
import cardSlice from "./Slices/Card/cardSlice";
import etcSlice from "./Slices/Etc/etcSlice";
import userSlice from "./Slices/User/userSlice";

const { configureStore, getDefaultMiddleware } = require("@reduxjs/toolkit");

export default configureStore({
  reducer: {
    auth: AuthSlice,
    user: userSlice,
    card: cardSlice,
    etc: etcSlice,
    [noteziaApi.reducerPath]: noteziaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(noteziaApi.middleware),
});
