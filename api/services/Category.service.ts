import { get, PROJECT_KEY } from '@/api/api';

const getCategories = async (token: string) => {
  return get(`/${PROJECT_KEY}/categories`, token);
};

export const CategoryService = {
  getCategories,
};
