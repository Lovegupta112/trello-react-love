import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;

const initialState = {
  checkItems: {},
  error: null,
};

export const fetchCheckItems = createAsyncThunk(
  "checkItem/fetchCheckItems",
  async (checkListId) => {
    try {
      const response = await axios.get(
        `https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${apiKey}&token=${apiToken}`
      );
      return { checkListId, data: response.data };
    } catch (error) {
      throw error;
    }
  }
);

export const createNewCheckItem = createAsyncThunk(
  "checkItem/createCheckItem",
  async ({ checkListId, checkItemTitle }) => {
    try {
      const response = await axios.post(
        `https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${checkItemTitle}&key=${apiKey}&token=${apiToken}`
      );
      return { checkListId, data: response.data };
    } catch (error) {
      throw error;
    }
  }
);
export const deleteCheckItem = createAsyncThunk(
  "checkItem/deleteCheckItem",
  async ({ checkListId, checkItemId }) => {
    try {
      await axios.delete(
        `https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkItemId}?key=${apiKey}&token=${apiToken}`
      );
      return { checkListId, checkItemId };
    } catch (error) {
      throw error;
    }
  }
);
export const updateCheckItem = createAsyncThunk(
  "checkItem/updateCheckItem",
  async ({ cardId, checkItemId, isChecked, checkListId }) => {
    try {
      await axios.put(
        `https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}?key=${apiKey}&token=${apiToken}&state=${
          isChecked ? "complete" : "incomplete"
        }`
      );
      return { checkItemId, isChecked, checkListId };
    } catch (error) {
      throw error;
    }
  }
);
const checkItemSlice = createSlice({
  name: "checkItem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCheckItems.fulfilled, (state, action) => {
      const { checkListId, data } = action.payload;
      state.checkItems[checkListId] = data;
    }),
      builder.addCase(fetchCheckItems.rejected, (state, action) => {
        state.error = action.error.message;
      }),
      builder.addCase(createNewCheckItem.fulfilled, (state, action) => {
        const { checkListId, data } = action.payload;
        state.checkItems[checkListId].push(data);
      }),
      builder.addCase(createNewCheckItem.rejected, (state, action) => {
        state.error = action.error.message;
      }),
      builder.addCase(deleteCheckItem.fulfilled, (state, action) => {
        const { checkListId, checkItemId } = action.payload;
        state.checkItems[checkListId] = state.checkItems[checkListId].filter(
          (checkItem) => checkItem.id !== checkItemId
        );
      }),
      builder.addCase(deleteCheckItem.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder.addCase(updateCheckItem.fulfilled, (state, action) => {
      const { checkItemId, isChecked, checkListId } = action.payload;
      state.checkItems[checkListId] = state.checkItems[checkListId].map(
        (checkItem) => {
          if (checkItem.id == checkItemId) {
            checkItem.state = isChecked ? "complete" : "incomplete";
          }
          return checkItem;
        }
      );
    }),
      builder.addCase(updateCheckItem.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default checkItemSlice.reducer;
