'use client';

import React from 'react';
import FsButton from '@/components/FsButton';
import { FsButtonType } from '@/types/enums';
import PlusIcon from '@/components/Icons/PlusIcon';
import MinusIcon from '@/components/Icons/MinusIcon';

const onClick = () => console.log('btn clicked');
const Pages = () => {
  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px' }}>
      <FsButton className={FsButtonType.BIG} label='Big' onClick={onClick} startIcon={<PlusIcon />} />
      <FsButton className={FsButtonType.MEDIUM} label='Medium' onClick={onClick} />
      <FsButton label='Regular' onClick={onClick} />
      <FsButton disabled={true} label='Reg. disabled' onClick={onClick} />
      <FsButton className={FsButtonType.ICON} onClick={onClick} icon={<PlusIcon />} />
      <FsButton className={FsButtonType.ICON} onClick={onClick} icon={<MinusIcon />} />
      <FsButton className={FsButtonType.ICON} onClick={onClick} icon={<PlusIcon />} disabled={true} />
      <FsButton className={FsButtonType.ICON} onClick={onClick} icon={<MinusIcon />} disabled={true} />
    </div>
  );
};

export default Pages;
