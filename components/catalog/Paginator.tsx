import { useDispatch, useSelector } from '@/redux/store';
import { Pagination } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { actions as searchActions } from '@/redux/slices/searchSlice/searchSlice';

export interface PaginatorParams {
  count: number;
}

const Paginator: FC<PaginatorParams> = ({ count }) => {
  const [pageSize, setPageSize] = useState<'medium' | 'large'>('large');
  const paginatorPage = useSelector(state => state.search.paginatorPage);
  const dispatch = useDispatch();
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(searchActions.setPaginatorPage(value));
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      setPageSize('medium');
    } else {
      setPageSize('large');
    }
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPageSize('medium');
      } else {
        setPageSize('large');
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Pagination
      className='paginator'
      count={count}
      page={paginatorPage}
      onChange={handleChange}
      size={pageSize}
      shape='rounded'
      siblingCount={0}
    />
  );
};

export default Paginator;
