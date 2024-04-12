import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '../../common/types';
import { createUser } from '../actions/actions';

const initialState = {
  isLoggedIn: false,
  userName: '',
  password: '',
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
