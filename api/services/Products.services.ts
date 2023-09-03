import { get, PROJECT_KEY } from '@/api/api';
import { SortParams } from '@/types/enums';
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
  categoryId?: string,
  sortIndex?: number
) => {
  const filterParamsArr = [];
  const sortParams = [
    {
      feature: SortParams.NAME,
      order: SortParams.ASC,
    },
    {
      feature: SortParams.NAME,
      order: SortParams.DESC,
    },
    {
      feature: SortParams.PRICE,
      order: SortParams.ASC,
    },
    {
      feature: SortParams.PRICE,
      order: SortParams.DESC,
    },
  ];

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

  if (sortIndex !== 0 && sortIndex !== undefined) {
    filterParamsArr.push(`sort=${sortParams[sortIndex - 1].feature} ${sortParams[sortIndex - 1].order}`);
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
