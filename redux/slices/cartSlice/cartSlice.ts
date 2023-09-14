import { Action, createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { addDiscountCodeAsync, cartInteractionAsync, createCartAsync, getCartAsync, removeCartAsync } from './thunk';
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
    discountCodes: Discount[];
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

interface Discount {
  discountCode: Record<string, string>;
  state: string;
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
  discountedPrice: DiscountedPrice;
}

interface DiscountedPrice {
  includedDiscounts: Record<string, string>[];
  value: Record<string, number | string>;
}

export interface Cart {
  cartId: string | null;
  version: number | null;
  cartProductsIds: Record<string, Record<string, CartItem>>;
  lineItems: CartItem[];
  totalPrice: ProductPrice['value'] | null;
  totalLineItemQuantity: number | null;
  isRemoveItem: boolean;
  cartCoupons: string[];
}

export interface CartState extends Cart {
  status: 'idle' | 'pending' | 'succeeded' | 'failed' | undefined;
}

export const initialState: CartState = {
  cartId: null,
  version: null,
  status: 'idle',
  cartProductsIds: {},
  lineItems: [],
  totalPrice: null,
  totalLineItemQuantity: null,
  isRemoveItem: false,
  cartCoupons: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    isRemoveItem: (state, action: PayloadAction<boolean>) => {
      state.isRemoveItem = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        isAnyOf(
          createCartAsync.pending,
          cartInteractionAsync.pending,
          getCartAsync.pending,
          addDiscountCodeAsync.pending,
          removeCartAsync.pending
        ),
        state => {
          state.status = 'pending';
        }
      )
      .addMatcher(
        isAnyOf(
          createCartAsync.fulfilled,
          cartInteractionAsync.fulfilled,
          getCartAsync.fulfilled,
          addDiscountCodeAsync.fulfilled
        ),
        (state, action: CartPayloadAction) => {
          state.status = 'idle';
          state.cartId = action.payload.id;
          state.version = action.payload.version;
          state.lineItems = action.payload.lineItems;
          state.totalPrice = action.payload.totalPrice;
          state.cartCoupons = action.payload.discountCodes.map(code => code.discountCode.id);
          state.cartProductsIds = action.payload.lineItems.reduce(
            (acc: Record<string, Record<string, CartItem>>, i) => {
              if (acc[i.productId]) {
                acc[i.productId][i.variant.id] = i;
              } else {
                acc[i.productId] = { [i.variant.id]: i };
              }
              return acc;
            },
            {} as Record<string, Record<string, CartItem>>
          );
          state.totalLineItemQuantity = action.payload.totalLineItemQuantity;
        }
      )
      .addMatcher(isAnyOf(removeCartAsync.fulfilled), () => {
        debugger;
        return initialState;
      })
      .addMatcher(
        isAnyOf(
          createCartAsync.rejected,
          cartInteractionAsync.rejected,
          getCartAsync.rejected,
          addDiscountCodeAsync.rejected,
          removeCartAsync.rejected
        ),
        state => {
          state.status = 'failed';
        }
      );
  },
});

export const { actions } = cartSlice;
