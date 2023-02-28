import { createSlice, current } from '@reduxjs/toolkit';

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
      if (state.items.some((item) => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, action.payload],
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
        items: state.items.map((item) => {
          if (item.id === action.payload.id) {
            if (item.modifiers.length > 0){
              for(let i = 0; i < item.modifiers.length; i++){
                if(!action.payload.modifiers.includes(item.modifiers[i])){//if not in 
                  action.payload.modifiers.push(item.modifiers[i]); //then add
                } 
              }
              for(let i = 0; i < item.modifiersGroup.length; i++){
                action.payload.modifiersGroup.push(item.modifiersGroup[i]);
              }
            } 
            return action.payload;
          } 
          return item;
        }),
      };
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

// Action creators are generated for each case reducer function
export const {
  addToCart,
  updateCart,
  removeFromCart,
  setOrderTip,
  updateOrderMethod,
  clearCart,
  setOrderTotal,
  setOrderTax
} = cartSlice.actions;

export default cartSlice.reducer;

