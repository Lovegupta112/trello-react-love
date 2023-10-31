import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;

const initialState = {
  loading: false,
  lists: [],
  error: null,
};

export const fetchLists = createAsyncThunk("list/fetchLists", async (id) => {
  try {
    const response = await axios.get(
      `https://api.trello.com/1/boards/${id}/lists?key=${apiKey}&token=${apiToken}` //token
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const createNewList = createAsyncThunk(
  "list/createList",
  async ({ listName, id }) => {
    try {
      const response = await axios.post(
        `https://api.trello.com/1/lists?name=${listName}&idBoard=${id}&key=${apiKey}&token=${apiToken}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteSelectedList = createAsyncThunk(
  "list/deleteSelectedList",
  async (listId) => {
    try {
      const response = await axios.put(
        `https://api.trello.com/1/lists/${listId}/closed?key=${apiKey}&token=${apiToken}&value=true`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLists.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(fetchLists.fulfilled, (state, action) => {
        state.loading = false;
        state.lists = action.payload;
        state.error = null;
      }),
      builder.addCase(fetchLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }),
      builder.addCase(createNewList.fulfilled, (state, action) => {
        state.lists.push(action.payload);
      }),
      builder.addCase(createNewList.rejected, (state, action) => {
        state.error = action.error.message;
      }),
      builder.addCase(deleteSelectedList.fulfilled, (state, action) => {
        state.lists = state.lists.filter(
          (list) => list.id !== action.payload.id
        );
      }),
      builder.addCase(deleteSelectedList.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default listSlice.reducer;
