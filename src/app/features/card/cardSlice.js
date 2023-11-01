import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;

const initialState={
    cards:{},
    error:null,
}

export const fetchCards=createAsyncThunk('card/fetchCards',async(listId)=>{
    try {
        const response = await axios.get(
          `https://api.trello.com/1/lists/${listId}/cards/?key=${apiKey}&token=${apiToken}`
        );
        return {listId,data:response.data};
      } catch (error) {
        throw error;
      }
})

export const createNewCard=createAsyncThunk('card/createCard',async({listId,cardTitle})=>{
    try {
        const response = await axios.post(
          `https://api.trello.com/1/cards?idList=${listId}&key=${apiKey}&token=${apiToken}&name=${cardTitle}`
        );
        return {listId,data:response.data};
      } catch (error) {
        throw error;
      }
})

export const deleteCard=createAsyncThunk('card/deleteCard',async ({listId,cardId})=>{
    try {
        await axios.delete(
          `https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${apiToken}`
        );
        return {listId,cardId};
      } catch (error) {
       throw error;
      }
})



const cardSlice=createSlice({
    name:'card',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
       builder.addCase(fetchCards.fulfilled,(state,action)=>{
        const {listId,data}=action.payload;
        state.cards[listId]=data;
        state.error=null;
       }),
       builder.addCase(fetchCards.rejected,(state,action)=>{
        state.error=action.error.message;
       }),
       builder.addCase(createNewCard.fulfilled,(state,action)=>{
        const {listId,data}=action.payload;
        state.cards[listId].push(data);
       }),
       builder.addCase(createNewCard.rejected,(state,action)=>{
        state.error=action.error.message;
       }),
       builder.addCase(deleteCard.fulfilled,(state,action)=>{
        const {listId,cardId}=action.payload;
        state.cards[listId]=state.cards[listId].filter((card)=>card.id!==cardId);
       }),
       builder.addCase(deleteCard.rejected,(state,action)=>{
        state.error=action.error.message;
       })
    }

})

export default cardSlice.reducer;