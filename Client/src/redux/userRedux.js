import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    loginFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
    },

    // UPDATE USER:
    updateStart: (state) => {
      state.isFetching = true;
    },
    updateSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    updateFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  logout,
  updateStart,
  updateSuccess,
  updateFailed,
} = userSlice.actions;

export default userSlice.reducer;
