import React from 'react';
import FsTabs from '@/components/UI/FsTabs';
import { useSelector } from '@/redux/store';
import { FormGroups, ValidationRuleGroup } from '@/types/enums';
import { FormItemFieldsParams } from '@/types/types';

const tabsName: string[] = ['Personal Info', 'Shipping Address', 'Billing Address'];

const ProfileFormContainer = () => {
  const { customer } = useSelector(state => state.login);

  const shippingAddress: FormItemFieldsParams[] = [
    {
      id: 1,
      formGroup: FormGroups.SHIPPING_ADDRESS,
      validationRuleGroup: ValidationRuleGroup.PHONE,
      name: 'phone',
      type: 'phone',
      label: 'phone',
      value: '',
    },
    {
      id: 2,
      formGroup: FormGroups.SHIPPING_ADDRESS,
      validationRuleGroup: ValidationRuleGroup.COMMON,
      name: 'country',
      type: 'select',
      label: 'country',
      value: '',
      options: [
        { code: 'PL', name: 'Poland' },
        { code: 'DE', name: 'Germany' },
        { code: 'FX', name: 'France' },
      ],
    },
    {
      id: 3,
      formGroup: FormGroups.SHIPPING_ADDRESS,
      validationRuleGroup: ValidationRuleGroup.NAME,
      name: 'city',
      type: 'text',
      label: 'city',
      value: '',
    },
    {
      id: 4,
      name: 'streetName',
      formGroup: FormGroups.SHIPPING_ADDRESS,
      validationRuleGroup: ValidationRuleGroup.COMMON,
      type: 'text',
      label: 'street',
      value: '',
    },
    {
      id: 5,
      data: [
        {
          id: 13,
          formGroup: FormGroups.SHIPPING_ADDRESS,
          validationRuleGroup: ValidationRuleGroup.COMMON,
          name: 'building',
          type: 'text',
          label: 'building',
          value: '',
        },
        {
          id: 14,
          formGroup: FormGroups.SHIPPING_ADDRESS,
          validationRuleGroup: ValidationRuleGroup.COMMON,
          name: 'apartment',
          type: 'text',
          label: 'apt.',
          value: '',
        },
        {
          id: 15,
          formGroup: FormGroups.SHIPPING_ADDRESS,
          validationRuleGroup: ValidationRuleGroup.POSTAL_CODE_SHIPPING,
          name: 'postalCode',
          type: 'text',
          label: 'zip code',
          value: '',
        },
      ],
    },
    {
      id: 6,
      name: 'default',
      formGroup: FormGroups.SHIPPING_ADDRESS,
      validationRuleGroup: ValidationRuleGroup.NOVALIDATE,
      type: 'checkbox',
      label: 'set as default shipping address',
      value: '',
    },
  ];
  const billingAddress: FormItemFieldsParams[] = [
    {
      id: 7,
      formGroup: FormGroups.BILLING_ADDRESS,
      validationRuleGroup: ValidationRuleGroup.PHONE,
      name: 'phone',
      type: 'phone',
      label: 'phone',
      value: '',
    },
    {
      id: 8,
      formGroup: FormGroups.BILLING_ADDRESS,
      validationRuleGroup: ValidationRuleGroup.COMMON,
      name: 'country',
      type: 'select',
      label: 'country',
      value: '',
      options: [
        { code: 'PL', name: 'Poland' },
        { code: 'DE', name: 'Germany' },
        { code: 'FX', name: 'France' },
      ],
    },
    {
      id: 9,
      formGroup: FormGroups.BILLING_ADDRESS,
      validationRuleGroup: ValidationRuleGroup.NAME,
      name: 'city',
      type: 'text',
      label: 'city',
      value: '',
    },
    {
      id: 10,
      name: 'streetName',
      formGroup: FormGroups.BILLING_ADDRESS,
      validationRuleGroup: ValidationRuleGroup.COMMON,
      type: 'text',
      label: 'street',
      value: '',
    },
    {
      id: 11,
      data: [
        {
          id: 16,
          formGroup: FormGroups.BILLING_ADDRESS,
          validationRuleGroup: ValidationRuleGroup.COMMON,
          name: 'building',
          type: 'text',
          label: 'building',
          value: '',
        },
        {
          id: 17,
          formGroup: FormGroups.BILLING_ADDRESS,
          validationRuleGroup: ValidationRuleGroup.COMMON,
          name: 'apartment',
          type: 'text',
          label: 'apt.',
          value: '',
        },
        {
          id: 18,
          formGroup: FormGroups.BILLING_ADDRESS,
          validationRuleGroup: ValidationRuleGroup.POSTAL_CODE_BILLING,
          name: 'postalCode',
          type: 'text',
          label: 'zip code',
          value: '',
        },
      ],
    },
  ];
  const mainInputFields: FormItemFieldsParams[] = [
    {
      id: 19,
      formGroup: FormGroups.CUSTOMER,
      validationRuleGroup: ValidationRuleGroup.NAME,
      name: 'firstName',
      type: 'text',
      label: 'firstName',
      value: customer.firstName,
    },
    {
      id: 20,
      formGroup: FormGroups.CUSTOMER,
      validationRuleGroup: ValidationRuleGroup.NAME,
      name: 'lastName',
      type: 'text',
      label: 'lastName',
      value: customer.lastName,
    },
    {
      id: 21,
      formGroup: FormGroups.CUSTOMER,
      validationRuleGroup: ValidationRuleGroup.EMAIL,
      name: 'email',
      type: 'text',
      label: 'email',
      value: customer.email,
    },
    {
      id: 22,
      formGroup: FormGroups.CUSTOMER,
      validationRuleGroup: ValidationRuleGroup.BIRTHDAY,
      name: 'birthday',
      type: 'date',
      label: 'birthday',
      value: customer.dateOfBirth,
    },
  ];

  const customerData = {
    [FormGroups.CUSTOMER]: mainInputFields,
    [FormGroups.SHIPPING_ADDRESS]: shippingAddress,
    [FormGroups.BILLING_ADDRESS]: billingAddress,
  };

  return (
    <div className='profile__container'>
      <FsTabs tabs={tabsName} customer={customerData[FormGroups.CUSTOMER]} />
    </div>
  );
};

export default ProfileFormContainer;
