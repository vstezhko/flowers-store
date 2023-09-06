import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { actions as searchActions } from '@/redux/slices/searchSlice/searchSlice';
import { useDispatch, useSelector } from '@/redux/store';
import { SortNames } from '@/types/enums';

const SortMenu = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const sortIndex = useSelector(state => state.search.sortIndex);
  const open = Boolean(anchorEl);
  const sortNames = Object.values(SortNames);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    dispatch(searchActions.setSortIndex(index));
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
          <ListItemText primary='Sort by' secondary={sortNames[sortIndex]} />
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
        {sortNames.map((option, index) => (
          <MenuItem
            className='sort-menu__menu-item'
            key={option}
            selected={index === sortIndex}
            onClick={event => handleMenuItemClick(event, index)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default SortMenu;
