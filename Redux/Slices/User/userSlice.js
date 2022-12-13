import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {
      email: "",
      name: "",
      photos: {
        id: "",
        secure_url: "",
      },
    },
  },
  reducers: {
    setUserProfile: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setUserProfile } = userSlice.actions;

export default userSlice.reducer;
