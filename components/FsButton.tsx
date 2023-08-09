'use client';
import React, { MouseEventHandler, ReactElement, ReactNode } from 'react';
import { Button } from '@mui/material';
import { FsButtonType } from '@/types/enums';

interface FSButtonParams {
  label?: string;
  icon?: ReactElement;
  loading?: boolean;
  disabled?: boolean;
  startIcon?: ReactElement;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: FsButtonType;
  children?: ReactNode;
}

const FsButton: React.FC<FSButtonParams> = props => {
  const {
    icon = null,
    loading,
    label,
    disabled,
    startIcon = null,
    onClick = e => e,
    className = FsButtonType.REGULAR,
    children,
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
      className={`fsButton ${className}`}
      disabled={disabled || false}
      startIcon={loading ? null : startIcon}
      onClick={handleClick}>
      {content}
    </Button>
  );
};

export default FsButton;