import { get, post, PROJECT_KEY } from '@/api/api';
import { CurrencyParams } from '@/types/enums';

export interface LineItem {
  productId?: string;
  lineItemId?: number | string | undefined;
  quantity?: number;
  variantId?: number;
}

const createCart = async (token: string) => {
  const body = JSON.stringify({
    currency: CurrencyParams.EUR_TEXT,
  });
  const response = await post(`/${PROJECT_KEY}/me/carts`, token, body);
  const cartId = response.id;
  const version = response.version;
  localStorage.setItem('cart', JSON.stringify({ id: cartId, version: version }));
  return response;
};

const getCart = async (token: string, cartId: string) => {
  return get(`/${PROJECT_KEY}/me/carts/${cartId}`, token);
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
  const newVersion = response.version;
  localStorage.setItem('cart', JSON.stringify({ id: cartId, version: newVersion }));
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
  const newVersion = response.version;
  localStorage.setItem('cart', JSON.stringify({ id: cartId, version: newVersion }));
  return response;
};

const removeCart = () => {
  localStorage.removeItem('cart');
};

export const CartService = {
  createCart,
  getCart,
  getCartFromLS,
  removeCart,
  cartInteraction,
  addDiscountCode,
};
