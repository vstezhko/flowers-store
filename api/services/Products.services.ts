import { get, PROJECT_KEY } from '@/api/api';

const getProducts = async (token: string) => {
  return get(`/${PROJECT_KEY}/products`, token);
};

export const ProductService = {
  getProducts,
};
