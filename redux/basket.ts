import { RootState } from '@/redux/store';
import { ProductX } from '@/typings';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface BasketState {
  products: ProductX[]
}

const initialState: BasketState = {
    products: []
}

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (
        state: BasketState,
        action: PayloadAction<ProductX>
    ) => {
        state.products = [...state.products, action.payload];
    },
    removeFromBasket: (
        state: BasketState,
        action: PayloadAction<{ id: string }>
    ) => {
        const index = state.products.findIndex((product: ProductX) =>
            product.id === action.payload.id
        );
        const newBasket = [...state.products];
  
        if (index >= 0) {
            newBasket.splice(index, 1);
        }

        state.products = newBasket;
      },
  },
})

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectBasketProducts = (state: RootState) => state.basket.products;
export const selectBasketProductsWithId = (state: RootState, id: string) => {
    return state.basket.products.filter((product: ProductX) => product.id === id);
}
export const selectBasketTotalPrice = (state: RootState) => {
    return state.basket.products.reduce(
        (total: number, product: ProductX) => total + product.price,
        0
    );
}

export default basketSlice.reducer;