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
  paginatorPage: number;
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
  paginatorPage: 1,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    setSearch: (state, action) => {
      state.paginatorPage = initialState.paginatorPage;
      state.search = action.payload;
    },
    toggleCheckbox: (state, action) => {
      state.paginatorPage = initialState.paginatorPage;
      state.areFiltersSet = true;
      const { filterId, optionKey } = action.payload;
      if (!state.checkboxState[filterId]) {
        state.checkboxState[filterId] = {};
      }
      state.checkboxState[filterId][optionKey] = !state.checkboxState[filterId][optionKey];
    },
    setPriceRange: (state, action) => {
      state.paginatorPage = initialState.paginatorPage;
      state.areFiltersSet = true;
      state.priceRange = action.payload;
    },
    clearFilters: state => {
      state.paginatorPage = initialState.paginatorPage;
      state.areFiltersSet = false;
      state.checkboxState = initialState.checkboxState;
      state.priceRange = initialState.priceRange;
      state.status = initialState.status;
    },
    setCategoryId: (state, action) => {
      state.paginatorPage = initialState.paginatorPage;
      state.categoryId = action.payload;
    },
    setSortIndex: (state, action) => {
      state.paginatorPage = initialState.paginatorPage;
      state.sortIndex = action.payload;
    },
    setPaginatorPage: (state, action) => {
      state.paginatorPage = action.payload;
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
