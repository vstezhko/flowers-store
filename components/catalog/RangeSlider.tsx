import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useDispatch, useSelector } from '@/redux/store';
import { actions as searchActions } from '@/redux/slices/searchSlice/searchSlice';

function valueText(value: number) {
  return `${value} €`;
}

const marks = [
  {
    value: 0,
    label: '0 €',
  },
  {
    value: 1000,
    label: '1k €',
  },
];

const RangeSlider = () => {
  const dispatch = useDispatch();
  const priceRange = useSelector(state => state.search.priceRange);

  const handleChange = (event: Event, newValue: number | number[]) => {
    dispatch(searchActions.setPriceRange(newValue));
  };

  return (
    <Box className='filters__range-slider'>
      <Slider
        getAriaLabel={() => 'Price range'}
        value={priceRange}
        onChange={handleChange}
        valueLabelDisplay='auto'
        getAriaValueText={valueText}
        valueLabelFormat={valueText}
        size='small'
        step={50}
        max={1000}
        marks={marks}
      />
    </Box>
  );
};

export default RangeSlider;
