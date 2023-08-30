import { RootState } from '@/redux/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserC } from '@/gateway-types/typings';
import { UserOmit } from '@/typings';

export interface UserState {
    data: UserC|null
}

const initialState: UserState = {
    data: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state: UserState) => {
        state.data = null;
    },
    setUser: (state: UserState, user: PayloadAction<UserC|null>) => {
        state.data = user.payload;
    },
    updateUser: (
        state: UserState,
        user: PayloadAction<Partial<UserOmit>>
    ) => {
        if (state.data) {
            state.data = {
                ...state.data,
                ...user.payload
            }
        } else {
            throw Error('User is not set yet.');
        }
    }
  },
});

export const { 
    clearUser,
    setUser,
    updateUser
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user.data;

export default userSlice.reducer;