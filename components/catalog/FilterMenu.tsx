import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup, Paper, ClickAwayListener } from '@mui/material';
import CategorySelector from '@/components/catalog/CategorySelector';
import FilterBlock from '@/components/catalog/Filter';

function FilterMenu() {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const handleButtonChange = (event: React.MouseEvent<HTMLElement>, newSelectedButton: string) => {
    setSelectedButton(newSelectedButton);
  };

  const handleClose = () => {
    setSelectedButton(null);
  };

  return (
    <div id='setting-mobile'>
      <ToggleButtonGroup value={selectedButton} exclusive onChange={handleButtonChange} aria-label='popover-toggle'>
        <ToggleButton value='category' aria-label='category-button'>
          Category
        </ToggleButton>
        <ToggleButton value='filter' aria-label='filter-button'>
          Filter
        </ToggleButton>
      </ToggleButtonGroup>

      {selectedButton === 'category' && (
        <ClickAwayListener onClickAway={handleClose}>
          <Paper elevation={3}>
            <CategorySelector />
          </Paper>
        </ClickAwayListener>
      )}

      {selectedButton === 'filter' && (
        <ClickAwayListener onClickAway={handleClose}>
          <Paper elevation={3}>
            <FilterBlock />
          </Paper>
        </ClickAwayListener>
      )}
    </div>
  );
}

export default FilterMenu;
