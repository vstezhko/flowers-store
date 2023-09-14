import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TokenService } from '@/api/services/Token.service';
import { CartService } from '@/api/services/Cart.services';
import { useDispatch } from '@/redux/store';
import { removeCartAsync } from '@/redux/slices/cartSlice/thunk';
import FsButton from '../UI/FsButton';
import { FsButtonType } from '@/types/enums';

interface ConfirmationPromptParams {
  open: boolean;
  handleClose: () => void;
}

const ConfirmationPrompt = ({ open, handleClose }: ConfirmationPromptParams) => {
  const dispatch = useDispatch();

  const handleClearCart = async () => {
    const token = TokenService.getAccessTokenFromLS()?.token;
    const cartFromLS = CartService.getCartFromLS();
    if (token && cartFromLS?.id && cartFromLS?.version) {
      try {
        await dispatch(
          removeCartAsync({
            token,
            cartId: cartFromLS?.id,
            version: cartFromLS?.version,
          })
        ).unwrap();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      className='confirmation-prompt'>
      <DialogTitle>Are you sure you want to clear cart?</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          This action will remove all items from your cart.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <FsButton label='Clear cart' onClick={handleClearCart} className={FsButtonType.SMALL} />
        <FsButton label='Cancel' onClick={handleClose} className={FsButtonType.SMALL} />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationPrompt;
