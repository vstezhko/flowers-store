'use client';
import React, { MouseEventHandler, ReactElement, ReactNode } from 'react';
import { Button } from '@mui/material';
import { FsButtonType } from '@/types/enums';

interface FSButtonParams {
  // id: number;
  label?: string;
  icon?: ReactElement;
  loading?: boolean;
  disabled?: boolean;
  // color: string;
  // endIcon?: string;
  startIcon?: ReactElement;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: FsButtonType;
  children?: ReactNode;
}

const FsButton: React.FC<FSButtonParams> = props => {
  const {
    // id,
    icon = null,
    loading,
    label,
    disabled,
    // color,
    // endIcon = null,
    startIcon = null,
    onClick = e => e,
    className = FsButtonType.REGULAR,
    children,
    // ...other
  } = props;
  //
  const content = (
    <span>
      {children}
      {className === FsButtonType.ICON && icon ? React.cloneElement(icon, { disabled }) : null}
      {className !== FsButtonType.ICON && label ? <span>{label}</span> : null}
    </span>
  );
  const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
    if (!loading && onClick) {
      onClick(e);
    }
  };

  return (
    <Button
      color='primary'
      variant='contained'
      className={className}
      disabled={disabled || false}
      startIcon={loading ? null : startIcon}
      onClick={handleClick}>
      {content}
    </Button>
  );
};

export default FsButton;

// export default function TDXButton(props) {
//   const {
//     id,
//     bg,
//     size,
//     label,
//     availability,
//     loading,
//     disabled,
//     endIcon = null,
//     startIcon = null,
//     onClick = e => e,
//     className = '',
//     ...other
//   } = props
//
//   const content = (
//       <span className="tdx-button__content">
//             {props.children}
//         {availability ? <p className="tdx-button__availability">{availability}</p> : null}
//         {label ? <span className="tdx-button__label">{label}</span> : null}
//         </span>
//   )
//
//   const handleClick = e => {
//     !loading && onClick(e)
//   }
//
//   return (
//       <Button
//           {...other}
//           id={id}
//           className={`tdx-button ${size} ${'bg-' + bg} ${loading ?? ''} ${className ?? ''}`}
//           variant="contained"
//           disabled={disabled}
//           startIcon={loading ? null : startIcon}
//           endIcon={loading ? null : endIcon}
//           disableElevation
//           onClick={handleClick}>
//         {loading ? <CircularProgress color="inherit" size={16} /> : content}
//       </Button>
//   )
// }
