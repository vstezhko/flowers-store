import { ClearOutlined, SearchOutlined } from '@mui/icons-material';
import { Divider, IconButton, InputBase, InputBaseProps, Paper } from '@mui/material';
import { useState } from 'react';

interface SearchbarProps {
  inputProps: InputBaseProps;
  className?: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit(searchItem: string): void;
  onClear(): void;
}
const Searchbar = (props: SearchbarProps) => {
  const [searchValue, setSearchValue] = useState(props.value);

  return (
    <Paper
      id='search'
      className='searchbar'
      component='form'
      elevation={0}
      onSubmit={e => {
        e.preventDefault();
        props.onSubmit(searchValue);
      }}>
      <InputBase
        placeholder='SEARCH...'
        value={searchValue}
        onChange={e => {
          setSearchValue(e.target.value);
        }}
        {...props.inputProps}
      />
      {searchValue && (
        <IconButton
          type='button'
          onClick={() => {
            setSearchValue('');
            props.onClear();
          }}>
          <ClearOutlined />
        </IconButton>
      )}
      <Divider className='searchbar__divider' orientation='vertical' />
      <IconButton type='submit'>
        <SearchOutlined />
      </IconButton>
    </Paper>
  );
};

export default Searchbar;
