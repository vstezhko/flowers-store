import { Action, createSlice } from '@reduxjs/toolkit';
import { getProductByIdAsync } from '@/redux/slices/productSlice/thunks';

export interface ProductData {
  categories: ProductCategory[];
  description: {
    en: string;
  };
  masterVariant: ProductVariant;
  name: {
    en: string;
  };
  slug: {
    en: string;
  };
  variants: ProductVariant[];
  searchKeywords: {};
}

export interface ProductPayloadAction extends Action {
  payload: {
    id: string;
    version: number;
    masterData: {
      current: ProductData;
      hasStagedChanges: boolean;
      published: boolean;
      staged: ProductData;
    };
    productType: {
      id: string;
      typeId: string;
    };
    taxCategory: {
      id: string;
      typeId: string;
    };
    createdAt: string;
    lastModifiedAt: string;
  };
}

export interface ProductState extends Product {
  status: 'idle' | 'pending' | 'succeeded' | 'failed' | undefined;
}

export interface ProductCategory {
  typeId: string;
  id: string;
}

interface ProductPrice {
  id: string;
  discounted: {
    discount: {
      id: string;
      type: string;
    };
    value: ProductPrice['value'];
  };
  value: {
    type: string;
    currencyCode: 'EUR';
    centAmount: number;
    fractionDigits: number;
  };
}

export interface ProductImage {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
}

interface Channel {
  isOnStock: boolean;
  availableQuantity: number;
  version: number;
  id: string;
}

export interface ProductVariant {
  id: number;
  sku: string;
  key: string;
  prices: ProductPrice[];
  images: ProductImage[];
  attributes: ProductAttribute[];
  assets: [];
  availability: {
    channels: Record<string, Channel>;
  };
}

interface ProductAttribute {
  name: string;
  value: string;
}

interface Product {
  id: string | null;
  name: {
    en: string | null;
  };
  description: {
    en: string | null;
  };
  categories: ProductCategory[];
  masterVariant: ProductVariant | null;
  variants: ProductVariant[];
}

export const initialState: ProductState = {
  status: 'idle',
  id: null,
  name: {
    en: null,
  },
  categories: [],
  description: {
    en: null,
  },
  masterVariant: null,
  variants: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearState: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(getProductByIdAsync.pending, state => {
      state.status = 'pending';
    });

    builder.addCase(getProductByIdAsync.fulfilled, (state: ProductState, action: ProductPayloadAction) => {
      state.status = 'idle';
      state.id = action.payload.id;
      Object.assign(state, action.payload.masterData.staged);
    });

    builder.addCase(getProductByIdAsync.rejected, state => {
      state.status = 'failed';
    });
  },
});

export const { actions } = productSlice;
