import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ItemState } from "../types/redux-types";

const API_URL = "https://63d304794abff88834170d21.mockapi.io/items";

export interface FetchItemsParams {
  sortBy?: string;
  orderBy?: string;
  order?: 'asc' | 'desc';
  search?: string;
}

export const fetchItems = createAsyncThunk('items/fetchItems',
  async ({ sortBy = 'name', orderBy = 'name', order = 'asc', search = '' }: FetchItemsParams) => {
    const response = await axios.get(`${API_URL}?${sortBy ? `sortBy=${sortBy}` : ''}&${orderBy ? `orderBy=${orderBy}` : ''}&${order ? `order=${order}` : ''}&${search ? `search=${search}` : ''}`);
    return response.data;
  })

export const fetchItemById = createAsyncThunk('items/fetchItemById', async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
});

const initialState: ItemState = {
  items: [],
  item: null,
  status: 'idle',
  error: null,
};



const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (status) => {
        status.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (status, action) => {
        status.status = 'succeeded';
        status.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchItemById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.item = action.payload;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  }
})



export default itemSlice.reducer;