import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: 'selectedChat',
  initialState: {
    chats: null,
  },
  reducers: {
    setChat: (state, action) => {
      state.chats = action.payload;
    },
  },
});

export const { setChat } = chatSlice.actions;
export default chatSlice.reducer;
