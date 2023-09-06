import { SnackbarProvider, closeSnackbar, enqueueSnackbar } from 'notistack';
import { IconButton } from '@mui/material';
import { FC, PropsWithChildren, useEffect } from 'react';
import BrokenHeartIcon from '@/components/Icons/BrokenHeartIcon';
import { useDispatch, useSelector } from '@/redux/store';
import HeartIcon from '@/components/Icons/HeartIcon';
import { snackbarSlice } from '@/redux/slices/snackbarSlice/snackbarSlice';

const SnackBarIcon = ({ id, variant }: { id: number | string; variant: string | undefined }) => {
  return (
    <IconButton onClick={() => closeSnackbar(id)}>
      {variant === 'success' ? <HeartIcon /> : <BrokenHeartIcon />}
    </IconButton>
  );
};

export const SnackBarProvider: FC<PropsWithChildren> = ({ children }) => {
  const { message, variant } = useSelector(state => state.snackbar);
  const dispatch = useDispatch();
  useEffect(() => {
    if (message) {
      enqueueSnackbar(message, { variant });
      dispatch(snackbarSlice.actions.removeMessage());
    }
  }, [dispatch, message, variant]);
  return (
    <SnackbarProvider hideIconVariant action={id => <SnackBarIcon id={id} variant={variant} />}>
      {children}
    </SnackbarProvider>
  );
};
