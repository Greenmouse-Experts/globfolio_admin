"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ChatData } from "@/shared/types/routine";

const initialState = {
  messages: [] as ChatData[]
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    saveMessages: (state, action: PayloadAction<ChatData[]>) => {
      state.messages = action.payload;
    },
    resetMessages: (state) => {
      state.messages = initialState.messages;
    },
  },
});

export const { saveMessages, resetMessages } = chatSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default chatSlice.reducer;