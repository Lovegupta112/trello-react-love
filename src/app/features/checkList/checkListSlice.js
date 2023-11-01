import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;

const initialState = {
  checkLists: [],
  error: null,
};

export const fetchCheckLists = createAsyncThunk(
  "checkList/fetchCheckLists",
  async (cardId) => {
    try {
      const response = await axios.get(
        `https://api.trello.com/1/cards/${cardId}/checklists?key=${apiKey}&token=${apiToken}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createNewCheckList = createAsyncThunk(
  "checkList/createCheckList",
  async ({ cardId, checkListTitle }) => {
    try {
      const response = await axios.post(
        `https://api.trello.com/1/cards/${cardId}/checklists?key=${apiKey}&token=${apiToken}&name=${checkListTitle}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const deleteCheckList = createAsyncThunk(
  "checkList/deleteCheckList",
  async (checkListId) => {
    try {
      const response = await axios.delete(
        `https://api.trello.com/1/checklists/${checkListId}?key=${apiKey}&token=${apiToken}`
      );
      return checkListId;
    } catch (error) {
      throw error;
    }
  }
);

const checkListSlice = createSlice({
  name: "checkList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCheckLists.fulfilled, (state, action) => {
      state.checkLists = action.payload;
    }),
      builder.addCase(fetchCheckLists.rejected, (state, action) => {
        state.error = action.error.message;
      }),
      builder.addCase(createNewCheckList.fulfilled, (state, action) => {
        state.checkLists.push(action.payload);
      }),
      builder.addCase(createNewCheckList.rejected, (state, action) => {
        state.error = action.error.message;
      }),
      builder.addCase(deleteCheckList.fulfilled, (state, action) => {
        state.checkLists = state.checkLists.filter(
          (checkList) => checkList.id !== action.payload
        );
      }),
      builder.addCase(deleteCheckList.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default checkListSlice.reducer;
