import { createSlice } from "@reduxjs/toolkit";

export type User = {
  id: number;
  Username: string;
  Email: string;
  Address: string;
  PhoneNumber: string;
  FullName: string;
  Role: string;
} | null;

const initialState: {
  user: User;
  token: string;
} = {
  user: null,
  token: "",
};

export const loginUserSlice = createSlice({
  name: "loginUser",
  initialState: initialState,
  reducers: {
    loginSlice: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.data.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = "";
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSlice, logout } = loginUserSlice.actions;
export default loginUserSlice.reducer;
