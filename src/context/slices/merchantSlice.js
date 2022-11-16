import { createSlice } from '@reduxjs/toolkit';

export const merchantSlice = createSlice({
  name: 'merchant',
  initialState: {
    merchantID: null,
    urlPath: null,
    brandName: null,
    tableNumber: null,
    menuOptions: null,
    categories: null,
    products: null,
    selectedselectedCategoryName: null,
    selectedCategoryID: null,
    selectedProduct: {},
  },
  reducers: {
    setMerchantID: (state, action) => {
      return {
        ...state,
        merchantID: action.payload
      };
    },
    setBrandName: (state, action) => {
      state.brandName = action.payload;
    },
    setURLPath: (state, action) => {
      state.urlPath = action.payload;
    },
    setTableNumber: (state, action) => {
      state.setTableNumber = action.payload;
    },
    setMenuOptions: (state, action) => {
      state.menuOptions = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCategoryName: (state, action) => {
      state.selectedCategoryName = action.payload;
    },
    setCategoryID: (state, action) => {
      state.selectedCategoryID = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setMerchantID, setBrandName, setURLPath, setMenuOptions, setProducts, setCategoryName, setCategoryID, setTableNumber, setSelectedProduct } = merchantSlice.actions;

export default merchantSlice.reducer;

