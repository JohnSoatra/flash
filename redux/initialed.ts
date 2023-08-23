import { RootState } from '@/redux/store';
import { createSlice } from '@reduxjs/toolkit';

export interface InitialedState {
    value: boolean
}

const initialedState: InitialedState = {
    value: false
};

const initialedSlice = createSlice({
  name: 'initialed',
  initialState: initialedState,
  reducers: {
    setInitialed: (state: InitialedState) => {
        state.value = true;
    }
  },
});

export const { setInitialed } = initialedSlice.actions;

export const selectInitialed = (state: RootState) => state.initialed.value;

export default initialedSlice.reducer;