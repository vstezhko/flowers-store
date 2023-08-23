import { SnackbarProvider, closeSnackbar } from 'notistack';
import { IconButton } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import BrokenHeartIcon from '@/components/Icons/BrokenHeartIcon';
import { useSelector } from '@/redux/store';
import HeartIcon from '@/components/Icons/HeartIcon';

const SnackBarIcon = ({ id }: { id: number | string }) => {
  const { variant } = useSelector(state => state.login);
  return (
    <IconButton onClick={() => closeSnackbar(id)}>
      {variant === 'success' ? <HeartIcon /> : <BrokenHeartIcon />}
    </IconButton>
  );
};

export const SnackBarProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SnackbarProvider hideIconVariant action={id => <SnackBarIcon id={id} />}>
      {children}
    </SnackbarProvider>
  );
};
