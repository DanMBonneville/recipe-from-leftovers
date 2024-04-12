import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '../../common/types';
import { createUser, loginUser } from '../actions/actions';

const initialState = {
  isLoggingIn: false,
  isLoggedIn: false,
  idToken: '',
  email: '',
  defaultIngredients: {},
} satisfies UserState as UserState;

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
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
      console.log('login user rejected');
    });
    builder.addCase(createUser.pending, (state: UserState) => {
      console.log('Create user pending... ');
    });
    builder.addCase(createUser.fulfilled, (state: UserState, action: any) => {
      console.log('Create user fulfilled! action payload: ', action.payload);
    });
    builder.addCase(createUser.rejected, (state: UserState, action: any) => {
      console.log('Create user rejected');
    });
  },
});

export const { getDefafultIngredients } = userSlice.actions;
export default userSlice.reducer;
