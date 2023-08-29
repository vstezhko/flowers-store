import * as React from 'react';
import Modal from '@mui/material/Modal';

export default function FsModal({
  children,
  open,
  handleClose,
}: {
  children: React.JSX.Element;
  open: boolean;
  handleClose: () => void;
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'>
      {children}
    </Modal>
  );
}
