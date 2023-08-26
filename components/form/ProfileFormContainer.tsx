import React from 'react';
import FsButton from '@/components/UI/FsButton';
import { FsButtonType } from '@/types/enums';
import Image from 'next/image';
import { FormItemFieldsParams } from '@/types/types';

const ProfileFormContainer = ({
  childrenComponent,
  data,
  src,
}: {
  children: React.JSX.Element;
  data: FormItemFieldsParams[];
  src: string;
}) => {
  return (
    <>
      <form className='form-customer'>
        <div className='form__content'>{childrenComponent(data)}</div>
        <div className='form__btn-container'>
          <FsButton variant='outlined' label='cancel' className={FsButtonType.SMALL} />
          <FsButton label='update' className={FsButtonType.SMALL} />
        </div>
      </form>
      <div className='profile__container-img'>
        <Image className='profile__img' src={src} alt='ProfileContainer photo' layout='fill' />
      </div>
    </>
  );
};

export default ProfileFormContainer;
