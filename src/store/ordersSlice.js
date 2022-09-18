import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  openOrders: [],
  totalOrders: [],
  closedOrders: [],
};

export const ordersSlice = createSlice({
  name: 'openOrders',
  initialState,
  reducers: {
    setOpenOrders: (state, action) => ({ ...state, openOrders: action.payload }),
  },
});

export const { setOpenOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
