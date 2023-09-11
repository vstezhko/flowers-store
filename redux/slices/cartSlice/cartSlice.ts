import { Action, createSlice, isAnyOf, isFulfilled } from '@reduxjs/toolkit';
import { addToCartAsync, createCartAsync, getCartAsync } from './thunk';
import { ProductPrice, ProductVariant } from '@/redux/slices/productSlice/productSlice';

interface CartCustomer {
  clientId: string;
  customer: {
    typeId: string;
    id: string;
  };
  isPlatformClient: boolean;
}

export interface CartPayloadAction extends Action {
  payload: {
    cartState: string;
    createdAt: string;
    createdBy: CartCustomer;
    customLineItems: CartItem[];
    customerId: string;
    deleteDaysAfterLastModification: number;
    directDiscounts: [];
    discountCodes: [];
    id: string;
    inventoryMode: string;
    itemShippingAddresses: [];
    lastMessageSequenceNumber: number;
    lastModifiedAt: string;
    lastModifiedBy: CartCustomer;
    lineItems: CartItem[];
    origin: string;
    refusedGifts: [];
    shipping: [];
    shippingMode: string;
    taxCalculationMode: string;
    taxMode: string;
    taxRoundingMode: string;
    totalLineItemQuantity: number;
    totalPrice: ProductPrice['value'];
    type: string;
    version: number;
    versionModifiedAt: string;
  };
}

export interface CartItem {
  id: string;
  name: {
    en: string;
  };
  productId: string;
  price: ProductPrice;
  quantity: number;
  totalPrice: ProductPrice['value'];
  variant: ProductVariant;
}

export interface Cart {
  cartId: string | null;
  version: number | null;
  cartProductsIds: string[];
  lineItems: CartItem[];
  totalPrice: ProductPrice['value'] | null;
  totalLineItemQuantity: number | null;
}

export interface CartState extends Cart {
  status: 'idle' | 'pending' | 'succeeded' | 'failed' | undefined;
}

export const initialState: CartState = {
  cartId: null,
  version: null,
  status: 'idle',
  cartProductsIds: [],
  lineItems: [],
  totalPrice: null,
  totalLineItemQuantity: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(isAnyOf(createCartAsync.pending, addToCartAsync.pending, getCartAsync.pending), state => {
        state.status = 'pending';
      })
      .addMatcher(isAnyOf(createCartAsync.fulfilled, addToCartAsync.fulfilled), (state, action) => {
        state.status = 'idle';
        state.cartId = action.payload.id;
        state.version = action.payload.version;
        state.lineItems = action.payload.lineItems;
        state.totalPrice = action.payload.totalPrice;
        state.cartProductsIds = action.payload.lineItems.map((i: CartItem) => i.productId);
        state.totalLineItemQuantity = action.payload.totalLineItemQuantity;
      })
      .addMatcher(isFulfilled(getCartAsync), (state: CartState, action: CartPayloadAction) => {
        state.status = 'idle';
        state.cartId = action.payload.id;
        state.version = action.payload.version;
        state.lineItems = action.payload.lineItems;
        state.totalPrice = action.payload.totalPrice;
        state.cartProductsIds = action.payload.lineItems.map((i: CartItem) => i.productId);
        state.totalLineItemQuantity = action.payload.totalLineItemQuantity;
      })
      .addMatcher(isAnyOf(createCartAsync.rejected, addToCartAsync.rejected, getCartAsync.rejected), state => {
        state.status = 'failed';
      });
  },
});

export const { actions } = cartSlice;
