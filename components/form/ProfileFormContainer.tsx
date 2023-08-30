import React, { useMemo } from 'react';
import { FormGroups, ValidationRuleGroup } from '@/types/enums';
import Image from 'next/image';
import { FormItemFieldsParams } from '@/types/types';
import PersonalInfoForm from '@/components/form/personalForm/PersonalInfoForm';
import ProfileAddressCard from '@/components/profile/ProfileAddressCard';
import PersonalForm from '@/components/form/personalForm/PersonalForm';
import { useSelector } from '@/redux/store';

const ProfileFormContainer = ({ src, type }: { src: string; type: string }) => {
  const { customer } = useSelector(state => state.login);
  const billingIds = customer.billingAddressIds;
  const shippingIds = customer.shippingAddressIds;
  const billing = customer.addresses.filter(address => billingIds.includes(address.id));
  const shipping = customer.addresses.filter(address => shippingIds.includes(address.id));

  const mainInputFields: FormItemFieldsParams[] = useMemo(() => {
    return [
      {
        id: 19,
        formGroup: FormGroups.CUSTOMER,
        validationRuleGroup: ValidationRuleGroup.NAME,
        name: 'firstName',
        type: 'text',
        label: 'firstName',
        value: customer.firstName || '',
      },
      {
        id: 20,
        formGroup: FormGroups.CUSTOMER,
        validationRuleGroup: ValidationRuleGroup.NAME,
        name: 'lastName',
        type: 'text',
        label: 'lastName',
        value: customer.lastName || '',
      },
      {
        id: 21,
        formGroup: FormGroups.CUSTOMER,
        validationRuleGroup: ValidationRuleGroup.EMAIL,
        name: 'email',
        type: 'text',
        label: 'email',
        value: customer.email || '',
      },
      {
        id: 22,
        formGroup: FormGroups.CUSTOMER,
        validationRuleGroup: ValidationRuleGroup.BIRTHDAY,
        name: 'dateOfBirth',
        type: 'date',
        label: 'birthday',
        value: customer.dateOfBirth || '',
      },
    ];
  }, [customer]);

  return type === FormGroups.CUSTOMER ? (
    <div className='personal__form-container'>
      <PersonalForm childComponent={PersonalInfoForm} modeEdit={true} data={mainInputFields} type={type} />
      <div className='profile__container-img'>
        <Image className='profile__img' src={src} alt='ProfileContainer photo' layout='fill' />
      </div>
    </div>
  ) : (
    <div className='personal__form-container'>
      <div className='form-customer form-customer_address'>
        {type === FormGroups.SHIPPING_ADDRESS ? (
          <ProfileAddressCard addressData={shipping} type={type} customer={customer} />
        ) : (
          <ProfileAddressCard addressData={billing} type={type} customer={customer} />
        )}
      </div>
      {/*<div className='profile__container-img'>*/}
      {/*  <Image className='profile__img' src={src} alt='ProfileContainer photo' layout='fill' />*/}
      {/*</div>*/}
    </div>
  );
};

export default ProfileFormContainer;
