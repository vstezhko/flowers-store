import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const options = ['No sort', 'Name (A-Z)', 'Name (Z-A)', 'Price (low to high)', 'Price (high to low)'];

const SortMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='sort-menu'>
      <List className='sort-menu__list' aria-label='Sort settings'>
        <ListItem
          className='sort-menu__list-item'
          id='sort-button'
          aria-haspopup='listbox'
          aria-controls='sort-menu'
          aria-label='sort by'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}>
          <ListItemText primary='Sort by' secondary={options[selectedIndex]} />
        </ListItem>
      </List>
      <Menu
        className='sort-menu__menu'
        id='sort-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'sort-button',
          role: 'listbox',
        }}
        disableScrollLock={true}>
        {options.map((option, index) => (
          <MenuItem
            className='sort-menu__menu-item'
            key={option}
            selected={index === selectedIndex}
            onClick={event => handleMenuItemClick(event, index)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default SortMenu;
