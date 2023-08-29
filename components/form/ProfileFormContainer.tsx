import React from 'react';
import { FormGroups } from '@/types/enums';
import Image from 'next/image';
import { FormItemFieldsParams } from '@/types/types';
import PersonalInfoForm from '@/components/form/personalForm/PersonalInfoForm';
import ProfileAddressCard from '@/components/profile/ProfileAddressCard';
import PersonalForm from '@/components/form/personalForm/PersonalForm';
import { useSelector } from '@/redux/store';

const ProfileFormContainer = ({ data, src, type }: { data: FormItemFieldsParams[]; src: string; type: string }) => {
  const { customer } = useSelector(state => state.login);
  const billingIds = customer.billingAddressIds;
  const shippingIds = customer.shippingAddressIds;
  const billingAddresses = customer.addresses.filter(address => billingIds.includes(address.id));
  const shippingAddresses = customer.addresses.filter(address => shippingIds.includes(address.id));
  return type === FormGroups.CUSTOMER ? (
    <div className='personal__form-container'>
      <PersonalForm childComponent={PersonalInfoForm} data={data} type={type} />
      <div className='profile__container-img'>
        <Image className='profile__img' src={src} alt='ProfileContainer photo' layout='fill' />
      </div>
    </div>
  ) : (
    <div className='personal__form-container'>
      <div className='form-customer'>
        {type === FormGroups.SHIPPING_ADDRESS ? (
          <ProfileAddressCard addressData={shippingAddresses} data={data} type={type} />
        ) : (
          <ProfileAddressCard addressData={billingAddresses} data={data} type={type} />
        )}
      </div>
      <div className='profile__container-img'>
        <Image className='profile__img' src={src} alt='ProfileContainer photo' layout='fill' />
      </div>
    </div>
  );
};

export default ProfileFormContainer;
