import { RootState } from '@/redux/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CsrfState {
    value: string
}

const initialState: CsrfState = {
    value: ''
};

const csrfSlice = createSlice({
  name: 'csrf',
  initialState,
  reducers: {
    setCsrf: (state: CsrfState, user: PayloadAction<string>) => {
        state.value = user.payload;
    }
  },
});

export const { setCsrf } = csrfSlice.actions;

export const selectCsrf = (state: RootState) => state.user.data;

export default csrfSlice.reducer;