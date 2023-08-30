import { Action, createSlice } from '@reduxjs/toolkit';
import { getCategoriesAsync } from '@/redux/slices/categorySlice/thunks';

export interface Category {
  id: string;
  typeId: string;
}

export interface CreatedInfo {
  clientId: string;
  isPlatformClient: boolean;
}

export interface LanguagesData {
  en: string;
}

export interface CategoryFullData {
  ancestors: Category[];
  assets: [];
  createdAt: string;
  createdBy: CreatedInfo;
  externalId: string;
  id: string;
  key: string;
  lastMessageSequenceNumber: number;
  lastModifiedAt: string;
  lastModifiedBy: CreatedInfo;
  name: LanguagesData;
  orderHint: string;
  slug: LanguagesData;
  version: number;
  parent: Category;
}

export interface CategoryState {
  status: 'idle' | 'pending' | 'succeeded' | 'failed' | undefined;
  categories: Record<CategoryFullData['id'], CategoryFullData> | null;
}

export interface CategoryPayloadAction extends Action {
  payload: {
    count: number;
    limit: number;
    offset: number;
    results: CategoryFullData[];
    total: number;
  };
}

const initialState: CategoryState = {
  status: 'idle',
  categories: null,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCategoriesAsync.fulfilled, (state: CategoryState, action: CategoryPayloadAction) => {
      state.status = 'succeeded';
      state.categories = action.payload.results.reduce(
        (acc: Record<CategoryFullData['id'], CategoryFullData>, category: CategoryFullData) => {
          return { [category.id]: category, ...acc };
        },
        {}
      );
    });
  },
});

export const { actions } = categorySlice;
