import { createSlice } from "@reduxjs/toolkit";
import cardInitialState from "../../Initial States/cardInitialState";

const cardSlice = createSlice({
  name: "card",
  initialState: {
    data: cardInitialState,
  },
  reducers: {
    setCardData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCardData } = cardSlice.actions;

export default cardSlice.reducer;
