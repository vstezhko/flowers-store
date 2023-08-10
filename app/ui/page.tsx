'use client';

import React from 'react';
import FsButton from '@/components/UI/FsButton';
import { FormGroups, FsButtonType } from '@/types/enums';
import PlusIcon from '@/components/Icons/PlusIcon';
import MinusIcon from '@/components/Icons/MinusIcon';
import FsInput from '@/components/UI/FsInput';
import FsCheckbox from '@/components/UI/FsCheckbox';

const onClick = () => console.log('btn clicked');
const Pages = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
      {/*<div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px' }}>*/}
      <FsInput
        id='1'
        label='First name'
        defaultValue='unactive'
        errorText=' '
        formGroup={FormGroups.CUSTOMER}
        name='dddddd'
        onBlur={() => {}}
        onChange={() => {}}
        value='q'
        disabled
      />
      {/*  <FsInput id='2' label='Last name' errorText='Error Text' defaultValue='focused' focused />*/}
      {/*  <FsInput id='3' label='Last name' errorText='Error Text' defaultValue='error' error />*/}
      {/*  <FsInput id='3' label='Last name' errorText='Error Text' defaultValue='error' disabled />*/}
      {/*</div>*/}
      {/*<div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px' }}>*/}
      {/*  <FsInput id='4' type='password' label='Password' defaultValue='unactive' />*/}
      {/*  <FsInput id='5' type='password' label='Password' focused defaultValue='focused' />*/}
      {/*  <FsInput id='6' type='password' label='Password' error errorText='Error Text' defaultValue='error' />*/}
      {/*</div>*/}
      {/*<div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px' }}>*/}
      {/*  <FsPhoneInput id='7' label='Phone' />*/}
      {/*  <FsPhoneInput id='8' label='Phone' defaultValue={'+48 123 456 789'} />*/}
      {/*</div>*/}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px' }}>
        <FsCheckbox label='set as default shipping address' />
        <FsCheckbox label='set as default shipping address' checked />
        <FsCheckbox label='set as default shipping address' disabled />
      </div>
    </div>
  );
};

export default Pages;
