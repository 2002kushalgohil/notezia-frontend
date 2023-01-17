import { createSlice } from "@reduxjs/toolkit";

const etcSlice = createSlice({
  name: "etc",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = etcSlice.actions;

export default etcSlice.reducer;
