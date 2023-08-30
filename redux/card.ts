import { CardX } from '@/gateway-types/typings';
import { RootState } from '@/redux/store';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CardState {
  cards: CardX[]
}

const initialState: CardState = {
    cards: []
}

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        setCard: (
            state: CardState,
            action: PayloadAction<CardX[]>
        ) => {
            state.cards = [...action.payload];
        },
        addToCard: (
            state: CardState,
            action: PayloadAction<CardX|string>
        ) => {
            if (typeof action.payload === 'string') {
                const index = state.cards.findIndex(card => card.id === action.payload);

                if (index > -1) {
                    state.cards[index].quantity += 1;
                }
            } else {
                state.cards.push(action.payload);
            }
        },
        removeFromCard: (
            state: CardState,
            action: PayloadAction<CardX>
        ) => {
            const index = state.cards.findIndex(card => card.id === action.payload.id);
            
            if (index > -1 && state.cards[index].quantity > 0) {
                state.cards[index].quantity -= 1;
            }
        },
        removeAllFromCard: (
            state: CardState,
            action: PayloadAction<CardX>
        ) => {
            const index = state.cards.findIndex(card => card.id === action.payload.id);
            
            if (index > -1) {
                state.cards = state.cards.filter(card => card.id !== action.payload.id);
            }
        },
    }
});

export const { setCard, addToCard, removeFromCard, removeAllFromCard } = cardSlice.actions;

export const selectCard = (state: RootState) => state.card.cards;

export default cardSlice.reducer;