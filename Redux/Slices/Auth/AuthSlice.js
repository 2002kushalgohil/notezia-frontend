import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    accessToken: "",
  },
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setIsAuth, setToken } = authSlice.actions;

export default authSlice.reducer;
