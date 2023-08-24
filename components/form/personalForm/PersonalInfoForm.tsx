import FsInput from '@/components/UI/FsInput';
import FsButton from '@/components/UI/FsButton';
import { FsButtonType } from '@/types/enums';
import Image from 'next/image';
import profileImage from '@/public/img/jpeg/profile.webp';
import * as React from 'react';
import { FormItemFieldsParams } from '@/types/types';

const PersonalInfoForm = ({ customer }: { customer: FormItemFieldsParams[] }) => {
  return (
    <>
      <form className='form-customer'>
        <div className='form__content'>
          {customer.map(inputData => {
            if ('data' in inputData) {
              return <></>;
            }
            if ('value' in inputData) {
              const { id, value, name, formGroup, ...rest } = inputData;
              const compoundName = `${formGroup}-${name}`;
              return (
                <FsInput
                  {...rest}
                  id={inputData.name}
                  key={inputData.id}
                  name={compoundName}
                  value={inputData.value ? inputData.value : null || undefined}
                  onChange={() => console.log('jjj')}
                  label={inputData.label || ''}
                  formGroup={formGroup}
                />
              );
            }
          })}
        </div>
        <div className='form__btn-container'>
          <FsButton variant='outlined' label='cancel' className={FsButtonType.SMALL} />
          <FsButton label='update' className={FsButtonType.SMALL} />
        </div>
      </form>
      <div className='profile__container-img'>
        <Image className='profile__img' src={profileImage.src} alt='Profile photo' layout='fill' />
      </div>
    </>
  );
};

export default PersonalInfoForm;
