import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
       name:'user',
       initialState:{
              notification:[],

       },
       reducers:{
              setNotification:(state,action)=>{
                     console.log(action.payload);
                     state.notification.push(action.payload)
              },
             
       }
})
 
export const {setNotification} = notificationSlice.actions
export default notificationSlice.reducer