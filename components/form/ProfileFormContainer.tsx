import React from 'react';
import FsButton from '@/components/UI/FsButton';
import { FsButtonType } from '@/types/enums';
import Image from 'next/image';
import { FormItemFieldsParams } from '@/types/types';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const ProfileFormContainer = ({
  childrenComponent,
  data,
  src,
}: {
  children: React.JSX.Element;
  data: FormItemFieldsParams[];
  src: string;
}) => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <form className='form-customer'>
        <div className='form__content'>
          <FormControlLabel
            className='switch'
            control={<Switch checked={checked} onChange={handleChange} size='small' />}
            label='EDIT'
          />
          {childrenComponent(data, checked)}
        </div>
        {checked && (
          <div className='form__btn-container'>
            <FsButton variant='outlined' label='cancel' className={FsButtonType.SMALL} />
            <FsButton label='save' className={FsButtonType.SMALL} />
          </div>
        )}
      </form>
      <div className='profile__container-img'>
        <Image className='profile__img' src={src} alt='ProfileContainer photo' layout='fill' />
      </div>
    </>
  );
};

export default ProfileFormContainer;
