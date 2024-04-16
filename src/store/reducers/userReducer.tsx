import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '../../common/types';
import { createUser, loginUser } from '../actions/actions';

const initialState = {
  idToken: '',
  email: '',
  defaultIngredients: {},
  isLoggingIn: false,
  isLoggedIn: false,
  loginErrorMessage: '',
  isSigningUp: false,
  signUpErrorCode: '',
  signUpErrorMessage: '',
} satisfies UserState as UserState;

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
    },
    getDefafultIngredients: (state, action) => {
      state.defaultIngredients = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state: UserState) => {
      state.isLoggingIn = true;
    });
    builder.addCase(loginUser.fulfilled, (state: UserState, action: any) => {
      state.isLoggingIn = false;
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.idToken = action.payload.idToken;
    });
    builder.addCase(loginUser.rejected, (state: UserState, action: any) => {
      state.isLoggingIn = false;
      state.isLoggedIn = false;
      state.loginErrorMessage = action.error.message;
    });
    builder.addCase(createUser.pending, (state: UserState) => {
      state.isSigningUp = true;
    });
    builder.addCase(createUser.fulfilled, (state: UserState, action: any) => {
      // TODO: sign up happy path
      // add spinner while signing in
      state.isSigningUp = false;
      console.log('Create user fulfilled! action payload: ', action.payload);
    });
    builder.addCase(createUser.rejected, (state: UserState, action: any) => {
      state.isSigningUp = false;
      state.signUpErrorCode = action.error.code;
      state.signUpErrorMessage = action.error.message;
    });
  },
});

export const { logout, getDefafultIngredients } = userSlice.actions;
export default userSlice.reducer;
