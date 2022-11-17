import { createSlice } from '@reduxjs/toolkit';

export const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    mobileNumber: null,
    firstName: null,
    pageBeforeAuthFlow: null,
    hasPaymentMethod: false
  },
  reducers: {
    setMobileNumber: (state, action) => {
      state.mobileNumber = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setPageBeforeAuthFlow: (state, action) => {
      state.pageBeforeAuthFlow = action.payload;
    }
  }
});

export const { setMobileNumber, setFirstName, setPageBeforeAuthFlow } = customerSlice.actions;

export default customerSlice.reducer;

