import { createSlice } from '@reduxjs/toolkit';

export const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    mobileNumber: null,
    name: null,
    pageBeforeAuthFlow: null,
    hasPaymentMethod: false
  },
  reducers: {
    setMobileNumber: (state, action) => {
      state.mobileNumber = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setPageBeforeAuthFlow: (state, action) => {
      state.pageBeforeAuthFlow = action.payload;
    }
  }
});

export const { setMobileNumber, setName, setPageBeforeAuthFlow } = customerSlice.actions;

export default customerSlice.reducer;

