import { get, post, PROJECT_KEY } from '@/api/api';
import { CurrencyParams } from '@/types/enums';

export interface LineItem {
  productId: string;
  quantity: number;
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
  const cartId = localStorage.getItem('cart');
  if (typeof cartId === 'string') {
    return JSON.parse(cartId);
  }
  return null;
};

const addToCart = async (token: string, cartId: string, version: number, lineItem: LineItem) => {
  const body = JSON.stringify({
    version,
    actions: [
      {
        action: 'addLineItem',
        ...lineItem,
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
  addToCart,
  removeCart,
};
