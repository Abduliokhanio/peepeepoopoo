import { createSlice } from '@reduxjs/toolkit';

export const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    mobileNumber: null,
    firstName: null,
    lastName: null,
    emailAddress:null,
    hasPaymentMethod: false
  },
  reducers: {
    setMobileNumber: (state, action) => {
      state.mobileNumber = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    }
  }
});

export const { setMobileNumber, setFirstName, setLastName } = customerSlice.actions;

export default customerSlice.reducer;

