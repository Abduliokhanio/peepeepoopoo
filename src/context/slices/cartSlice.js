import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    tip: null,
    isOrderOpen: false
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
    setOrderTip: (state, action) => {
      state.tip = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

// Action creators are generated for each case reducer function
export const { addToCart, updateCart, removeFromCart, setOrderTip, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

