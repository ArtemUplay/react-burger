import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wsConnected: false,
  messages: [],
  error: undefined,
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    wsFeedConnectionStart: (state) => {
      state.wsConnected = true;
    },
    wsFeedConnectionError: (state, action) => {
      state.error = action.payload;
      state.wsConnected = false;
    },
    wsFeedConnectionClosed: (state, action) => {
      state.error = undefined;
      state.wsConnected = false;
    },
    wsFeedConnectionMessage: (state, action) => {
      state.error = undefined;
      state.messages = action.payload;
    },
  },
});

export const {
  wsFeedConnectionStart,
  wsFeedConnectionError,
  wsFeedConnectionClosed,
  wsFeedConnectionMessage,
} = feedSlice.actions;

export default feedSlice.reducer;
