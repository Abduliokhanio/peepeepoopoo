import { createSlice, current } from '@reduxjs/toolkit';
import { isBindingElement } from 'typescript';

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
      if (state.items.some((item) => item?.id === action.payload.id)) {
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
            console.log('action (aka coming into redux) - ', action.payload);
            console.log('action (already in redux) - ', current(item));
            if (item.modifiers.length > 0){
              addModsAndModGroupsToRedux(item, action);
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

//Helper Methods

function addModsAndModGroupsToRedux(item,action){
  addModsToRedux(item, action);
  addModGroupssToRedux(item, action);
}

function addModsToRedux(item, action){
  for(let i = 0; i < item.modifiers.length; i++){
    ifNotInThenAdd(action,item.modifiers[i]);
  }
}

function addModGroupssToRedux(item, action){
  for(let i = 0; i < item.modifiersGroup.length; i++){
    action.payload.modifiersGroup.push(item.modifiersGroup[i]);
  }
}

function ifNotInThenAdd(action,itemMod){
  if(action.payload.modifiers.find(modifier => modifier.name !== itemMod.name)){//if not in 
    action.payload.modifiers.push(itemMod); //then add
  } 
  if(action.payload.deselectThis){
    action.payload.modifiers = action.payload.modifiers.filter(e => e.name !== action.payload.deselectThis.name);
  }
  action.payload;
}

