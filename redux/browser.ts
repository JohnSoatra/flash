import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface BrowserState {
    browserId: string,
    visitorId: string
}

const browserState: BrowserState = {
    browserId: '',
    visitorId: ''
};

const browserSlice = createSlice({
  name: 'browser',
  initialState: browserState,
  reducers: {
    setBrowserId: (state: BrowserState, action: PayloadAction<string>) => {
        state.browserId = action.payload;
    },
    setVisitorId: (state: BrowserState, action: PayloadAction<string>) => {
        state.visitorId = action.payload;
    },
  },
});

export const { setBrowserId, setVisitorId } = browserSlice.actions;

export default browserSlice.reducer;