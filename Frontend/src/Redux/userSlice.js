import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
       name:'user',
       initialState:{
              userId:null
       },
       reducers:{
              storeUser:(state,action)=>{
                     state.userId = action.payload
              }
       }
})
 
export const {storeUser} = loginSlice.actions
export default loginSlice.reducer