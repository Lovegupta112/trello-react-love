import {createSlice ,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;

const initialState={
    loading:false,
     boards:[],
     error:null
}

export const fetchBoards=createAsyncThunk('board/fetchBoards',async ()=>{
    try {
        const response = await axios.get(
          `https://api.trello.com/1/members/me/boards?&key=${apiKey}&token=${apiToken}`
        );
        return response.data;
      } catch (error) {
        throw error;
      }
})

export const createNewBoard=createAsyncThunk('board/createBoard',async(boardName)=>{
    try {
        const response = await axios.post(
          `https://api.trello.com/1/boards/?name=${boardName}&key=${apiKey}&token=${apiToken}`
        );
        return response.data;
      } catch (error) {
        throw error;
      }
})


const boardSlice=createSlice({
    name:'board',
   initialState,
   reducers:{},
   extraReducers:(builder)=>{
       builder.addCase(fetchBoards.pending,(state)=>{
            state.loading=true;
       }),
       builder.addCase(fetchBoards.fulfilled,(state,action)=>{
         state.loading=false;
         state.boards=action.payload;
         state.error=null;
       }),
       builder.addCase(fetchBoards.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.error.message;
       }),
       builder.addCase(createNewBoard.fulfilled,(state,action)=>{
        state.boards.push(action.payload);
       }),
       builder.addCase(createNewBoard.rejected,(state,action)=>{
         state.error=action.error.message;
       })
   }
})

export default boardSlice.reducer;
