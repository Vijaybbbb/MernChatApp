import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: 'selectedChat',
  initialState: {
    chats: [],
  },
  reducers: {
    setChat: (state, action) => {
      state.chats.push(action.payload)
    },
  },
});

export const { setChat } = chatSlice.actions;
export default chatSlice.reducer;
