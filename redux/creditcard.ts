import { CreditCardC } from '@/gateway-types/typings';
import { RootState } from '@/redux/store';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CreditCardState {
  data: CreditCardC|null
}

const initialState: CreditCardState = {
    data: null
}

const creditcardSlice = createSlice({
    name: 'creditcard',
    initialState,
    reducers: {
        setCreditcard: (
            state: CreditCardState,
            action: PayloadAction<CreditCardC|null>
        ) => {
            state.data = action.payload;
        },
        updateCreditcard: (
            state: CreditCardState,
            action: PayloadAction<Partial<CreditCardC>>
        ) => {
            if (state.data) {
                state.data = {
                    ...state.data,
                    ...action.payload
                }
            } else {
                throw Error('Creditcard is not set yet.');
            }
        },
    }
});

export const { setCreditcard, updateCreditcard } = creditcardSlice.actions;

export const selectCreditcard = (state: RootState) => state.creditcard.data;

export default creditcardSlice.reducer;