import { RootState } from '@/redux/store';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CookieState {
    volume: number,
    muted: boolean
}

const initialState: CookieState = {
    volume: 0,
    muted: false
}

const cookieSlice = createSlice({
  name: 'cookie',
  initialState,
  reducers: {
    changeVolume: (
        state: CookieState,
        action: PayloadAction<{volume: number}>
    ) => {
        state.volume = action.payload.volume;
    },
    changeMuted: (
        state: CookieState,
        action: PayloadAction<{muted: boolean}>
    ) => {
        state.muted = action.payload.muted;
    },
  },
});

export const { 
    changeVolume,
    changeMuted,
} = cookieSlice.actions;

export const selectCookieVolume = (state: RootState) => state.cookie.volume;
export const selectCookieMuted = (state: RootState) => state.cookie.muted;

export default cookieSlice.reducer;