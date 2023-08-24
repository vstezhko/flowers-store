import { get, PROJECT_KEY } from '@/api/api';

const getProducts = async (token: string) => {
  try {
    const response = await get(`/${PROJECT_KEY}/products`, token);
    return response;
  } catch (error) {
    throw error;
  }
};

export const ProductService = {
  getProducts,
};
