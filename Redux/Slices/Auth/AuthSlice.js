import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: true,
    token: "Kusgallsduskjsdiusfdvuyfhj",
  },
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setIsAuth, setToken } = authSlice.actions;

export default authSlice.reducer;
