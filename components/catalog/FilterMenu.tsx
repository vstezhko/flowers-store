import * as React from 'react';
import Popover from '@mui/material/Popover';
import { Button } from '@mui/material';

interface FsPopoverParams {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: () => void;
  anchorEl: HTMLButtonElement | null;
  children: React.JSX.Element;
  idElem: string;
  name: string;
}

export default function FsPopover({ handleClick, anchorEl, handleClose, children, idElem, name }: FsPopoverParams) {
  const open = Boolean(anchorEl);
  const id = open ? idElem : undefined;
  return (
    <div>
      <Button onClick={handleClick}>{name}</Button>
      <Popover
        className='settings__block'
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableScrollLock={true}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        {children}
      </Popover>
    </div>
  );
}
