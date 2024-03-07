import { createSlice } from "@reduxjs/toolkit";

const renderTrigger = createSlice({
  name: "renderTrigger",
  initialState: {
    trigger: false,
  },
  reducers: {
    switchTrigger: (state) => {
      state.trigger = !state.trigger;
    },
  },
});

export const { switchTrigger } = renderTrigger.actions;
export default renderTrigger.reducer;
