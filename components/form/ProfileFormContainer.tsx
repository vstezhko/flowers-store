import React, { useEffect, useMemo, useState } from 'react';
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (customer.email || customer.addresses.length <= 0) {
      setLoading(false);
    } else setLoading(true);
  }, [customer, loading]);

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

  const passwordInputFields: FormItemFieldsParams[] = useMemo(() => {
    return [
      {
        id: 23,
        formGroup: FormGroups.CUSTOMER,
        validationRuleGroup: ValidationRuleGroup.CURRENT_PASSWORD,
        name: 'currentPassword',
        type: 'password',
        label: 'current password',
        value: '',
      },
      {
        id: 24,
        formGroup: FormGroups.CUSTOMER,
        validationRuleGroup: ValidationRuleGroup.PASSWORD,
        name: 'password',
        type: 'password',
        label: 'new password',
        value: '',
      },
      {
        id: 25,
        formGroup: FormGroups.CUSTOMER,
        validationRuleGroup: ValidationRuleGroup.CONFIRM_PASSWORD,
        name: 'confirmPassword',
        type: 'password',
        label: 'confirm new password',
        value: '',
      },
    ];
  }, [customer]);

  return (
    <div className='personal__form-container'>
      {type === FormGroups.CUSTOMER ? (
        <PersonalForm
          childComponent={PersonalInfoForm}
          modeEdit={true}
          data={mainInputFields}
          type={type}
          loading={loading}
        />
      ) : type === FormGroups.SHIPPING_ADDRESS ? (
        <ProfileAddressCard addressData={shipping} type={type} customer={customer} loading={loading} />
      ) : type === FormGroups.BILLING_ADDRESS ? (
        <ProfileAddressCard addressData={billing} type={type} customer={customer} loading={loading} />
      ) : (
        <PersonalForm childComponent={PersonalInfoForm} modeEdit={false} data={passwordInputFields} type={type} />
      )}
      <div className='profile__container-img'>
        <Image className='profile__img' src={src} alt='ProfileContainer photo' layout='fill' />
      </div>
    </div>
  );
};

export default ProfileFormContainer;
