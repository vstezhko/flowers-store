import { PROJECT_KEY, post } from '@/api/api';

const createCart = async (token: string) => {
  const body = JSON.stringify({
    currency: 'EUR',
  });
  const response = await post(`/${PROJECT_KEY}/me/carts`, token, body);
  localStorage.setItem('cart', JSON.stringify({ id: response.id }));
};

const getCartIdFromLS = () => {
  const cartId = localStorage.getItem('cart');
  if (typeof cartId === 'string') {
    return JSON.parse(cartId).id;
  }
  return null;
};

export const CartService = {
  createCart,
  getCartIdFromLS,
};
