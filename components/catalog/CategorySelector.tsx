'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '@/redux/store';
import { TokenService } from '@/api/services/Token.service';
import { getCategoriesAsync } from '@/redux/slices/categorySlice/thunks';
import { CategoryFullData } from '@/redux/slices/categorySlice/categorySlice';
import { actions as searchActions } from '@/redux/slices/searchSlice/searchSlice';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';

export interface CategoryTreeData extends CategoryFullData {
  children?: CategoryTreeData[];
}

const CategorySelector = () => {
  const { categories } = useSelector(state => state.category);
  const { categoryId } = useSelector(state => state.search);
  const dispatch = useDispatch();
  const [mainCategories, setMainCategories] = useState<CategoryTreeData[]>([]);

  useEffect(
    function () {
      const fetchCategories = () => {
        const token = TokenService.getAccessTokenFromLS()?.token;
        if (token) dispatch(getCategoriesAsync(token));
      };

      if (!categories) fetchCategories();
      const createTree = (categoriesData: Record<CategoryFullData['id'], CategoryFullData>) => {
        const main: CategoryTreeData[] = Object.values(categoriesData)
          .filter(item => !item.parent)
          .map((item: CategoryTreeData) => ({ ...item, children: [] }));
        Object.values(categoriesData).forEach(item => {
          if (item.parent?.id) {
            const index = main.findIndex(i => i.id === item.parent?.id);
            if (main[index]) main[index].children?.push(item);
          }
        });
        return main;
      };

      if (categories) setMainCategories(createTree(categories));
    },

    [categories, dispatch]
  );

  const onChooseCategory = (event: React.SyntheticEvent, nodeId: string) => {
    dispatch(searchActions.setCategoryId(nodeId));
  };

  const renderTree = (nodes: CategoryTreeData) => (
    <TreeItem key={nodes.id} id={nodes.id} nodeId={nodes.id} label={nodes.name.en}>
      {Array.isArray(nodes.children) ? nodes.children.map(node => renderTree(node)) : null}
    </TreeItem>
  );

  return (
    <div className='category-selector'>
      <h4>Categories</h4>
      <TreeView
        className='category-selector__tree'
        id={'categories'}
        aria-label='Categories'
        disabledItemsFocusable={true}
        expanded={categories && categoryId ? [categoryId || '', categories[categoryId]?.parent?.id || ''] : ['']}
        selected={categoryId || ''}
        onNodeSelect={onChooseCategory}>
        {mainCategories && mainCategories.map(item => renderTree(item))}
      </TreeView>
    </div>
  );
};

export default CategorySelector;
