import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let initialState = {
  jsx: "",
};

export const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setJsx: (state, action) => {
      state.jsx = action.payload.jsx;
    },
  },
});

export const {} = appSlice.actions;
export default appSlice.reducer;
