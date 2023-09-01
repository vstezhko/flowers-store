'use client';
import React, { ChangeEvent } from 'react';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import FsCheckbox from '@/components/UI/FsCheckbox';
import RangeSlider from '@/components/catalog/RangeSlider';
import { FormGroup } from '@mui/material';

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
      rose: 'rose',
    },
  },
  {
    id: 'size',
    name: 'Size',
    options: {
      small: 'small',
      medium: 'medium',
      big: 'big',
    },
  },
];

const FilterBlock = () => {
  const [checked, setChecked] = React.useState(false);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, filterId: string, optionKey: string) => {
    setChecked(!checked);
    console.log(`Checkbox changed, status: ${checked}, filterId: ${filterId}, optionKey: ${optionKey}`);
  };

  const renderTree = (filter: filtersData) => {
    return (
      <TreeItem key={filter.id} id={filter.id} nodeId={filter.id} label={filter.name}>
        {filter.id === 'price' ? (
          <RangeSlider />
        ) : (
          // <div >
          <FormGroup className='filters__options'>
            {filter.options &&
              Object.entries(filter.options).map(option => (
                <FsCheckbox
                  checked={checked}
                  key={option[0]}
                  name={option[0]}
                  label={option[1]}
                  data-filter-id={filter.id}
                  data-option-key={option[0]}
                  onToggle={e => handleCheckboxChange(e, filter.id, option[0])}
                />
              ))}
          </FormGroup>
          // </div>
        )}
      </TreeItem>
    );
  };

  return (
    <div className='filters'>
      <h4>Filters</h4>
      <TreeView className='filters__tree' id={'filters'} aria-label='filters'>
        {filters && filters.map(item => renderTree(item))}
      </TreeView>
    </div>
  );
};

export default FilterBlock;
