import { get, PROJECT_KEY } from '@/api/api';

const getProductById = async (token: string, productId: string) => {
  return get(`/${PROJECT_KEY}/products/${productId}`, token);
};

export const ProductService = {
  getProductById,
};
