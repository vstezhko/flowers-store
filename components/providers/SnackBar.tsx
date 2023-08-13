// import { type FC, type PropsWithChildren } from 'react';
// import { SnackbarProvider, closeSnackbar } from 'notistack';
// import { IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
//
// const CloseSnackBarButton = ({ id }: { id: number | string }) => (
//   <IconButton style={{ color: '#fff' }} onClick={() => closeSnackbar(id)}>
//     <CloseIcon />
//   </IconButton>
// );
//
// export const SnackBarProvider: FC<PropsWithChildren> = ({ children }) => {
//   return (
//     <SnackbarProvider hideIconVariant action={id => <CloseSnackBarButton id={id} />}>
//       {children}
//     </SnackbarProvider>
//   );
// };
