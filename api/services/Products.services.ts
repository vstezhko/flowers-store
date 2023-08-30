import { get, PROJECT_KEY } from '@/api/api';
import { QueryParams } from '@/types/types';

const getProducts = async (token: string) => {
  const response = await get(`/${PROJECT_KEY}/products`, token);
  return response;
};

const getSearchProducts = async (token: string, queryParams: QueryParams) => {
  const response = await get(
    `/${PROJECT_KEY}/product-projections/search?${new URLSearchParams(
      Object.entries(queryParams).map(([key, value]) => [key, String(value)])
    )}`,
    token
  );
  return response;
};

export const ProductService = {
  getProducts,
  getSearchProducts,
};
