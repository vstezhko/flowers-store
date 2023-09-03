'use client';
import React, { ChangeEvent } from 'react';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import FsCheckbox from '@/components/UI/FsCheckbox';
import RangeSlider from '@/components/catalog/RangeSlider';
import { FormGroup } from '@mui/material';
import { useDispatch, useSelector } from '@/redux/store';
import { actions as searchActions } from '@/redux/slices/searchSlice/searchSlice';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

interface filtersData {
  id: string;
  name: string;
  options?: Record<string, string>;
}

const filters: filtersData[] = [
  {
    id: 'price',
    name: 'Price',
  },
  {
    id: 'color',
    name: 'Color',
    options: {
      white: 'white',
      yellow: 'yellow',
      pink: 'pink',
      red: 'red',
      blue: 'blue',
    },
  },
  {
    id: 'size',
    name: 'Size',
    options: {
      1: 'small',
      2: 'medium',
      3: 'big',
    },
  },
];

const FilterBlock = () => {
  const dispatch = useDispatch();
  const checkboxState = useSelector(state => state.search.checkboxState);
  const areFiltersSet = useSelector(state => state.search.areFiltersSet);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, filterId: string, optionKey: string) => {
    dispatch(searchActions.toggleCheckbox({ filterId, optionKey }));
  };

  const renderTree = (filter: filtersData) => {
    return (
      <TreeItem key={filter.id} id={filter.id} nodeId={filter.id} label={filter.name}>
        {filter.id === 'price' ? (
          <RangeSlider />
        ) : (
          <FormGroup className='filters__options'>
            {filter.options &&
              Object.entries(filter.options).map(option => (
                <FsCheckbox
                  checked={!!checkboxState[filter.id] && !!checkboxState[filter.id][option[0]]}
                  key={option[0]}
                  name={option[0]}
                  label={option[1]}
                  onToggle={e => handleCheckboxChange(e, filter.id, option[0])}
                />
              ))}
          </FormGroup>
        )}
      </TreeItem>
    );
  };

  return (
    <div className='filters'>
      <div className='filters__header'>
        <h4>Filters</h4>
        {areFiltersSet && (
          <FilterAltOffIcon
            className='filters__remove-filters'
            onClick={() => dispatch(searchActions.clearFilters())}
          />
        )}
      </div>
      <TreeView className='filters__tree' id={'filters'} aria-label='filters'>
        {filters && filters.map(item => renderTree(item))}
      </TreeView>
    </div>
  );
};

export default FilterBlock;
