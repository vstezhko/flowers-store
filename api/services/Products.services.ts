import { get, PROJECT_KEY } from '@/api/api';
import { SearchParams, FilterParams } from '@/types/types';

const getProducts = async (token: string) => {
  const response = await get(`/${PROJECT_KEY}/products`, token);
  return response;
};

const getSearchProducts = async (
  token: string,
  searchParams?: SearchParams,
  filterParams?: FilterParams,
  priceParams?: number[],
  categoryId?: string
) => {
  const filterParamsArr = [];

  if (filterParams !== undefined) {
    for (const filterKey in filterParams) {
      const filterValues = filterParams[filterKey];

      if (filterValues.length > 0) {
        filterParamsArr.push(`filter=variants.attributes.${filterKey}:"${filterValues.join(`","`)}"`);
      }
    }
  }

  if (priceParams !== undefined) {
    filterParamsArr.push(
      `filter=variants.scopedPrice.currentValue.centAmount:range(${priceParams[0] * 100} to ${priceParams[1] * 100})`
    );
  }

  if (categoryId !== undefined) {
    filterParamsArr.push(`filter=categories.id: subtree("${categoryId}")`);
  }

  const query = [
    ...Object.entries(searchParams || {}).map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`),
    ...filterParamsArr,
  ].join('&');

  const response = await get(`/${PROJECT_KEY}/product-projections/search?${query}`, token);
  return response;
};

export const ProductsService = {
  getProducts,
  getSearchProducts,
};
