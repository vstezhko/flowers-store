import React, { FC, useEffect, useMemo, useState } from 'react';
import { TokenService } from '@/api/services/Token.service';
import { getCategoriesAsync } from '@/redux/slices/categorySlice/thunks';
import { useDispatch, useSelector } from '@/redux/store';
import { Skeleton } from '@mui/material';
import { CategoryFullData } from '@/redux/slices/categorySlice/categorySlice';

export interface CategoryBreadcrumbsParams {
  categoryId: string | undefined;
  productName: string | null;
}

const CategoryBreadcrumbs: FC<CategoryBreadcrumbsParams> = ({ categoryId, productName = null }) => {
  const { categories } = useSelector(state => state.category);
  const dispatch = useDispatch();
  const [categoryChain, setCategoryChain] = useState<CategoryFullData[]>([]);

  const createCategoryChain = (
    id: string,
    allCategories: Record<string, CategoryFullData>,
    result: CategoryFullData[] = []
  ) => {
    if (allCategories[id].parent?.id) {
      createCategoryChain(allCategories[id].parent.id, allCategories, result);
    }
    result.push(allCategories[id]);

    return result;
  };

  useEffect(
    function () {
      const fetchCategories = () => {
        const token: string = TokenService.getAccessTokenFromLS()?.token;
        dispatch(getCategoriesAsync(token));
      };
      if (!categories) fetchCategories();
    },
    [categories, dispatch]
  );

  useEffect(() => {
    if (categories && categoryId) setCategoryChain(createCategoryChain(categoryId, categories));
  }, [categories, categoryId]);

  const categoryChainNodes = useMemo(() => {
    const categoriesNodes = categoryChain?.map(item => <span key={item.id}>{item.name.en}</span>);
    if (productName) categoriesNodes.push(<span key={productName}>{productName}</span>);
    return categoriesNodes;
  }, [categoryChain, productName]);

  return (
    <div className='category-breadcrumbs'>
      {categoryChainNodes && categoryChainNodes.length ? (
        categoryChainNodes.map((node, index) => (
          <React.Fragment key={node.key}>
            {index > 0 && ' > '}
            {node}
          </React.Fragment>
        ))
      ) : (
        <Skeleton variant='rectangular' width={200} height={30} />
      )}
    </div>
  );
};

export default CategoryBreadcrumbs;
