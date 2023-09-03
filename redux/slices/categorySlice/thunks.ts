import { createAppAsyncThunk } from '@/redux/createAppAsyncThunk';
import { CategoryService } from '@/api/services/Category.service';

export const getCategoriesAsync = createAppAsyncThunk('category/getCategories', async (token: string) => {
  return CategoryService.getCategories(token);
});
