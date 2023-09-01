import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valueText(value: number) {
  return `${value} €`;
}

const marks = [
  {
    value: 0,
    label: '0 €',
  },
  {
    value: 1500,
    label: '1.5k €',
  },
];

const RangeSlider = () => {
  const [value, setValue] = React.useState<number[]>([0, 1500]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Box className='filters__range-slider'>
      <Slider
        getAriaLabel={() => 'Price range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay='auto'
        getAriaValueText={valueText}
        valueLabelFormat={valueText}
        size='small'
        step={50}
        max={1500}
        marks={marks}
      />
    </Box>
  );
};

export default RangeSlider;
