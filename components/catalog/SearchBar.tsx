import { SearchOutlined } from '@mui/icons-material';
import { Divider, IconButton, InputBase, InputBaseProps, Paper } from '@mui/material';
import { useState } from 'react';

type SearchbarProps = {
  onSubmit(searchItem: string): void;
  inputProps: InputBaseProps;
  className?: string;
};
const Searchbar = (props: SearchbarProps) => {
  const [searchItem, setSearchItem] = useState('');

  return (
    <Paper
      className='searchbar'
      component='form'
      elevation={0}
      onSubmit={e => {
        e.preventDefault();
        props.onSubmit((searchItem as string) ?? '');
      }}>
      <InputBase
        placeholder='Search...'
        value={searchItem}
        onChange={e => {
          setSearchItem(e.target.value);
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
