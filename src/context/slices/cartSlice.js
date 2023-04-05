import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    tip: null,
    orderType: null,
    orderTotal: null,
    orderTax: null
  },
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      if (!state.items.some((item) => item?.id === id)) {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    updateCart: (state, action) => {
      const { id, modifiers } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.modifiers = modifiers;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    setOrderTip: (state, action) => {
      state.tip = action.payload;
    },
    updateOrderMethod: (state, action) => {
      state.orderType = action.payload;
    },
    setOrderTotal: (state, action) => {
      state.orderTotal = action.payload;
    },
    setOrderTax: (state, action) => {
      state.orderTax = action.payload;
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateCart,
  clearCart,
  setOrderTip,
  updateOrderMethod,
  setOrderTotal,
  setOrderTax
} = cartSlice.actions;

export default cartSlice.reducer;