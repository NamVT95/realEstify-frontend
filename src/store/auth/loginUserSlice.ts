import { createSlice } from "@reduxjs/toolkit";

export const loginUserSlice = createSlice({
  name: "loginUser",
  initialState: {
    user: {
      id: 0,
      Username: "",
      Email: "",
      Address: "",
      PhoneNumber: "",
      FullName: "",
      Role: "",
    },
    token: "",
  },
  reducers: {
    loginSlice: (state, action) => {
      console.log(action.payload);
      state.user = action.payload.user;
      state.token = action.payload.data.token;
    },
    logout: (state) => {
      state.user = {
        id: 0,
        Username: "",
        Email: "",
        Address: "",
        PhoneNumber: "",
        FullName: "",
        Role: "",
      };
      state.token = "";
    },
  },
});

export const { loginSlice, logout } = loginUserSlice.actions;
export default loginUserSlice.reducer;
