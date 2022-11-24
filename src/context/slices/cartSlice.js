import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    tip: null,
    isTabOpen: false,
    orderType: null,
    orderTotal: null,
    orderTax: null,
    ticketCompleted: false,
  },
  reducers: {
    addToCart: (state, action) => {
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    },
    removeFromCart: (state, action) => {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id)
      };
    },
    updateCart: (state, action) => {
      return {
        ...state,
        items: state.items.map(item => item.id === action.payload.id ? action.payload : item)
      };
    },
    clearCart: (state) => {
      state.items = [];
    },
    setOrderTip: (state, action) => {
      state.tip = action.payload;
    },
    setOrderType: (state, action) => {
      state.orderType = action.payload;
    },
    setIsTabOpen: (state, action) => {
      state.isTabOpen = action.payload;
    },
    setIsTicketCompleted: (state, action) => {
      state.isTicketCompleted = action.payload;
    },
    setOrderTotal: (state, action) => {
      state.total = action.payload;
    },
    setOrderTax: (state, action) => {
      state.tax = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  updateCart,
  removeFromCart,
  setOrderTip,
  setOrderType,
  setIsTabOpen,
  setIsTicketCompleted,
  clearCart,
  setOrderTotal,
  setOrderTax
} = cartSlice.actions;

export default cartSlice.reducer;

