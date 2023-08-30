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
    saveInitailMsg: (state, action: PayloadAction<ChatData[]>) => {
      state.messages = [...action.payload];
    },
    saveMessages: (state, action: PayloadAction<ChatData[]>) => {
      state.messages = [...state.messages, ...action.payload as ChatData[]];
    },
    resetMessages: (state) => {
      state.messages = initialState.messages;
    },
  },
});

export const { saveMessages, resetMessages, saveInitailMsg } = chatSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default chatSlice.reducer;