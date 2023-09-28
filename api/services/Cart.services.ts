import { get, post, remove, PROJECT_KEY } from '@/api/api';
import { CurrencyParams } from '@/types/enums';

export interface LineItem {
  productId?: string;
  lineItemId?: number | string | undefined;
  quantity?: number;
  variantId?: number;
}

const setCartToLS = (id: string, version: number) => {
  localStorage.setItem('cart', JSON.stringify({ id, version }));
};

const createCart = async (token: string) => {
  const body = JSON.stringify({
    currency: CurrencyParams.EUR_TEXT,
  });
  const response = await post(`/${PROJECT_KEY}/me/carts`, token, body);
  setCartToLS(response.id, response.version);
  return response;
};

const getCart = async (token: string, cartId: string) => {
  return get(`/${PROJECT_KEY}/me/carts/${cartId}`, token);
};

const getActiveCart = async (token: string) => {
  return get(`/${PROJECT_KEY}/me/active-cart`, token);
};

const getCartFromLS = (): { id: string; version: number } | null => {
  const cartId = localStorage?.getItem('cart');
  if (typeof cartId === 'string') {
    return JSON.parse(cartId);
  }
  return null;
};

const cartInteraction = async (token: string, cartId: string, version: number, lineItem: LineItem, action: string) => {
  const body = JSON.stringify({
    version,
    actions: [
      {
        action,
        ...lineItem,
      },
    ],
  });
  const response = await post(`/${PROJECT_KEY}/me/carts/${cartId}`, token, body);
  localStorage.setItem('cart', JSON.stringify({ id: cartId, version: response.version }));
  return response;
};

const addDiscountCode = async (token: string, cartId: string, version: number, action: string, code: string) => {
  const body = JSON.stringify({
    version,
    actions: [
      {
        action,
        code,
      },
    ],
  });
  const response = await post(`/${PROJECT_KEY}/me/carts/${cartId}`, token, body);
  localStorage.setItem('cart', JSON.stringify({ id: cartId, version: response.version }));
  return response;
};

const removeCartFromLS = () => {
  localStorage.removeItem('cart');
};

const removeCart = async (token: string, cartId: string, version: number) => {
  const response = await remove(`/${PROJECT_KEY}/me/carts/${cartId}?version=${version}`, token);
  removeCartFromLS();
  return response;
};

export const CartService = {
  setCartToLS,
  createCart,
  getCart,
  getActiveCart,
  getCartFromLS,
  removeCart,
  removeCartFromLS,
  cartInteraction,
  addDiscountCode,
};
