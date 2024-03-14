import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: {
      username: '',
      permission: '',
      company: '',
    },
  
    //username: null,
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      //state.username = action.payload;
      state.user.username = action.payload.username;
      state.user.permission = action.payload.permission;
      state.user.company = action.payload.company;

      state.error = null;
      AsyncStorage.setItem('auth', JSON.stringify(state.user.username));
    },
    logout: (state) => {
      state.isLoggedIn = false;
     // state.username = null;
     state.user = {
      username: '',
      permission: '',
      company: '',
    };

      state.error = null;
    },
    loginFailure: (state, action) => {   
      state.error = action.payload;
    },
  },
});

export const { login, logout,loginFailure } = authSlice.actions;
export default authSlice.reducer;