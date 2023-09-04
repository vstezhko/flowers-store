import { createSlice } from '@reduxjs/toolkit';
import { getSearchProductsAsync } from './thunks';
import { PriceRange } from '@/types/enums';

type CheckboxState = {
  [filterId: string]: {
    [optionKey: string]: boolean;
  };
};

export interface SearchProducts {
  search: string;
  checkboxState: CheckboxState;
  priceRange: Array<number>;
  areFiltersSet: boolean;
  categoryId?: string | undefined;
  sortIndex: number;
}

export interface SearchProductsState extends SearchProducts {
  status: 'idle' | 'pending' | 'succeeded' | 'failed' | undefined;
}

export const initialState: SearchProductsState = {
  search: '',
  checkboxState: {},
  priceRange: [PriceRange.MIN, PriceRange.MAX],
  areFiltersSet: false,
  status: 'idle',
  categoryId: undefined,
  sortIndex: 0,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    toggleCheckbox: (state, action) => {
      state.areFiltersSet = true;
      const { filterId, optionKey } = action.payload;
      if (!state.checkboxState[filterId]) {
        state.checkboxState[filterId] = {};
      }
      state.checkboxState[filterId][optionKey] = !state.checkboxState[filterId][optionKey];
    },
    setPriceRange: (state, action) => {
      state.areFiltersSet = true;
      state.priceRange = action.payload;
    },
    clearFilters: state => {
      state.areFiltersSet = false;
      state.checkboxState = initialState.checkboxState;
      state.priceRange = initialState.priceRange;
      state.status = initialState.status;
    },
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSortIndex: (state, action) => {
      state.sortIndex = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getSearchProductsAsync.pending, state => {
      state.status = 'pending';
    });

    builder.addCase(getSearchProductsAsync.fulfilled, state => {
      state.status = 'idle';
    });

    builder.addCase(getSearchProductsAsync.rejected, state => {
      state.status = 'failed';
    });
  },
});

export const { actions } = searchSlice;
