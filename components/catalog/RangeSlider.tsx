import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useDispatch, useSelector } from '@/redux/store';
import { actions as searchActions } from '@/redux/slices/searchSlice/searchSlice';
import { PriceRange } from '@/types/enums';

function valueText(value: number) {
  return `${value} €`;
}

const marks = [
  {
    value: PriceRange.MIN,
    label: `${PriceRange.MIN} €`,
  },
  {
    value: PriceRange.MAX,
    label: `${PriceRange.MAX} €`,
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
        step={PriceRange.STEP}
        max={PriceRange.MAX}
        marks={marks}
      />
    </Box>
  );
};

export default RangeSlider;
