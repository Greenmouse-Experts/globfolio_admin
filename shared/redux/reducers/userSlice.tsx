"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { authUser } from "@/shared/types/auth";
// import { authUser } from "@/shared/utils/types/auth";

const initialState = {
  user: {
    token: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    country: "",
    id: "",
    user_type: "",
    admin_type: "",
    avatar: ""
  } as authUser,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<authUser>) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = initialState.user;
    },
  },
});

export const { saveUser, resetUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;