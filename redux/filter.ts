import { RootState } from '@/redux/store';
import { Brand, Category, Collection, Model } from '@/gateway-types/index';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PriceRange, SortBy } from '@/typings';

export interface FilterState {
    collections: Collection[],
    categories: Category[],
    brands: Brand[],
    models: Model[],
    priceRange: PriceRange,
    sortBy: SortBy|null,
}

const initialState: FilterState = {
    collections: [],
    categories: [],
    brands: [],
    models: [],
    priceRange: {},
    sortBy: null,
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    removeFilterCategory(
        state: FilterState,
        action: PayloadAction<{id: string}>
    ) {
        state.categories = state.categories.filter(category => category.id !== action.payload.id);
    },
    pushFilterCategory(
        state: FilterState,
        action: PayloadAction<Category>
    ) {
        if (!state.categories.find(category => category.id === action.payload.id)) {
            state.categories.push(action.payload);
        }
    },
    removeFilterBrand(
        state: FilterState,
        action: PayloadAction<{id: string}>
    ) {
        state.brands = state.brands.filter(brand => brand.id !== action.payload.id);
    },
    pushFilterBrand(
        state: FilterState,
        action: PayloadAction<Brand>
    ) {
        if (!state.brands.find(brand => brand.id === action.payload.id)) {
            state.brands.push(action.payload);
        }
    },
    updateFilterBrands(
        state: FilterState,
        action: PayloadAction<Brand[]>
    ) {
        state.brands = action.payload;
    },
    removeFilterModel(
        state: FilterState,
        action: PayloadAction<{id: string}>
    ) {
        state.models = state.models.filter(model => model.id !== action.payload.id);
    },
    pushFilterModel(
        state: FilterState,
        action: PayloadAction<Model>
    ) {
        if (!state.models.find(model => model.id === action.payload.id)) {
            state.models.push(action.payload);
        }
    },
    updateFilterModels(
        state: FilterState,
        action: PayloadAction<Model[]>
    ){
        state.models = action.payload;
    },
    updateFilterPriceRage(
        state: FilterState,
        action: PayloadAction<PriceRange>
    ) {
        state.priceRange = action.payload;
    },
    updateFilterSortBy(
        state: FilterState,
        action: PayloadAction<SortBy|null>
    ) {
        state.sortBy = action.payload;
    }
  },
});

export const { 
    removeFilterCategory,
    pushFilterCategory,

    removeFilterBrand,
    pushFilterBrand,
    updateFilterBrands,

    removeFilterModel,
    pushFilterModel,
    updateFilterModels,

    updateFilterPriceRage,
    updateFilterSortBy
} = filterSlice.actions;

export const selectFilterCategories = (state: RootState) => state.filter.categories;
export const selectFilterBrands = (state: RootState) => state.filter.brands;
export const selectFilterModels = (state: RootState) => state.filter.models;
export const selectFilterPriceRange = (state: RootState) => state.filter.priceRange;
export const selectFilterSortBy = (state: RootState) => state.filter.sortBy;

export default filterSlice.reducer;