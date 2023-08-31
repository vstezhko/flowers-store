'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '@/redux/store';
import { TokenService } from '@/api/services/Token.service';
import { getCategoriesAsync } from '@/redux/slices/categorySlice/thunks';
import { CategoryFullData } from '@/redux/slices/categorySlice/categorySlice';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';

export interface CategoryTreeData extends CategoryFullData {
  children?: CategoryTreeData[];
}

const CategorySelector = () => {
  const { categories } = useSelector(state => state.category);
  const dispatch = useDispatch();
  const [mainCategories, setMainCategories] = useState<CategoryTreeData[]>([]);

  useEffect(
    function () {
      const fetchCategories = () => {
        const token: string = TokenService.getAccessTokenFromLS()?.token;
        dispatch(getCategoriesAsync(token));
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
    console.log(nodeId);
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
        id={'root'}
        aria-label='rich object'
        disabledItemsFocusable={true}
        expanded={mainCategories.map(item => item.id)}
        onNodeSelect={onChooseCategory}
        sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}>
        {mainCategories && mainCategories.map(item => renderTree(item))}
      </TreeView>
    </div>
  );
};

export default CategorySelector;
