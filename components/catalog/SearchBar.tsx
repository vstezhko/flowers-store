import { SearchOutlined } from '@mui/icons-material';
import { Divider, IconButton, InputBase, InputBaseProps, Paper } from '@mui/material';
import { useState } from 'react';

interface SearchbarProps {
  onSubmit(searchItem: string): void;
  inputProps: InputBaseProps;
  className?: string;
  value: string;
  onChange: (value: string) => void;
}
const Searchbar = (props: SearchbarProps) => {
  const [searchValue, setSearchValue] = useState(props.value);

  return (
    <Paper
      className='searchbar'
      component='form'
      elevation={0}
      onSubmit={e => {
        e.preventDefault();
        props.onSubmit(searchValue);
      }}>
      <InputBase
        placeholder='Search...'
        value={searchValue}
        onChange={e => {
          setSearchValue(e.target.value);
        }}
        {...props.inputProps}
      />
      <Divider className='searchbar__divider' orientation='vertical' />
      <IconButton type='submit'>
        <SearchOutlined />
      </IconButton>
    </Paper>
  );
};
export default Searchbar;
