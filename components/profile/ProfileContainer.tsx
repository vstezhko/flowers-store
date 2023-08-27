import React, { useMemo } from 'react';
import FsTabs from '@/components/UI/FsTabs';
import { useSelector } from '@/redux/store';
import { FormGroups, ValidationRuleGroup } from '@/types/enums';
import { FormItemFieldsParams } from '@/types/types';
import PersonalInfoForm from '@/components/form/personalForm/PersonalInfoForm';
import PersonalAddressForm from '@/components/form/personalForm/PersonalAddressForm';
import ProfileFormContainer from '@/components/form/ProfileFormContainer';
import profileImage from '@/public/img/jpeg/profile.webp';
import addressBillingImage from '@/public/img/jpeg/address2.jpeg';
import addressShippingImage from '@/public/img/jpeg/address.jpeg';

const tabsName: string[] = ['Personal Info', 'Shipping Address', 'Billing Address'];

const ProfileContainer = () => {
  const { customer } = useSelector(state => state.login);
  const shipping = customer.addresses.length > 0 ? customer.addresses[0] : null;
  const billing = customer.addresses.length > 0 ? customer.addresses[1] : null;

  const shippingAddress: FormItemFieldsParams[] = useMemo(() => {
    return [
      {
        id: 1,
        formGroup: FormGroups.SHIPPING_ADDRESS,
        validationRuleGroup: ValidationRuleGroup.PHONE,
        name: 'phone',
        type: 'phone',
        label: 'phone',
        value: shipping?.phone,
      },
      {
        id: 2,
        formGroup: FormGroups.SHIPPING_ADDRESS,
        validationRuleGroup: ValidationRuleGroup.COMMON,
        name: 'country',
        type: 'select',
        label: 'country',
        value: shipping?.country,
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
        value: shipping?.city,
      },
      {
        id: 4,
        name: 'streetName',
        formGroup: FormGroups.SHIPPING_ADDRESS,
        validationRuleGroup: ValidationRuleGroup.COMMON,
        type: 'text',
        label: 'street',
        value: shipping?.streetName,
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
            value: shipping?.building,
          },
          {
            id: 14,
            formGroup: FormGroups.SHIPPING_ADDRESS,
            validationRuleGroup: ValidationRuleGroup.COMMON,
            name: 'apartment',
            type: 'text',
            label: 'apt.',
            value: shipping?.apartment,
          },
          {
            id: 15,
            formGroup: FormGroups.SHIPPING_ADDRESS,
            validationRuleGroup: ValidationRuleGroup.POSTAL_CODE_SHIPPING,
            name: 'postalCode',
            type: 'text',
            label: 'zip code',
            value: shipping?.postalCode,
          },
        ],
      },
      {
        id: 6,
        name: 'default',
        formGroup: FormGroups.SHIPPING_ADDRESS,
        validationRuleGroup: ValidationRuleGroup.NOVALIDATE,
        type: 'checkbox',
        label: 'default shipping address',
        value: customer?.defaultShippingAddressId,
      },
    ];
  }, [customer]);

  const billingAddress: FormItemFieldsParams[] = useMemo(() => {
    return [
      {
        id: 7,
        formGroup: FormGroups.BILLING_ADDRESS,
        validationRuleGroup: ValidationRuleGroup.PHONE,
        name: 'phone',
        type: 'phone',
        label: 'phone',
        value: billing?.phone,
      },
      {
        id: 8,
        formGroup: FormGroups.BILLING_ADDRESS,
        validationRuleGroup: ValidationRuleGroup.COMMON,
        name: 'country',
        type: 'select',
        label: 'country',
        value: billing?.country,
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
        value: billing?.city,
      },
      {
        id: 10,
        name: 'streetName',
        formGroup: FormGroups.BILLING_ADDRESS,
        validationRuleGroup: ValidationRuleGroup.COMMON,
        type: 'text',
        label: 'street',
        value: billing?.streetName,
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
            value: billing?.building,
          },
          {
            id: 17,
            formGroup: FormGroups.BILLING_ADDRESS,
            validationRuleGroup: ValidationRuleGroup.COMMON,
            name: 'apartment',
            type: 'text',
            label: 'apt.',
            value: billing?.apartment,
          },
          {
            id: 18,
            formGroup: FormGroups.BILLING_ADDRESS,
            validationRuleGroup: ValidationRuleGroup.POSTAL_CODE_BILLING,
            name: 'postalCode',
            type: 'text',
            label: 'zip code',
            value: billing?.postalCode,
          },
        ],
      },
      {
        id: 19,
        name: 'default',
        formGroup: FormGroups.BILLING_ADDRESS,
        validationRuleGroup: ValidationRuleGroup.NOVALIDATE,
        type: 'checkbox',
        label: 'default shipping address',
        value: customer?.defaultBillingAddressId,
      },
    ];
  }, [customer]);

  const mainInputFields: FormItemFieldsParams[] = useMemo(() => {
    return [
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
  }, [customer]);

  const customerData = {
    [FormGroups.CUSTOMER]: mainInputFields,
    [FormGroups.SHIPPING_ADDRESS]: shippingAddress,
    [FormGroups.BILLING_ADDRESS]: billingAddress,
  };

  interface ChildComponent {
    component: React.JSX.Element;
  }

  const children: ChildComponent[] = [
    {
      component: (
        <ProfileFormContainer
          childComponent={PersonalInfoForm}
          data={customerData[FormGroups.CUSTOMER]}
          src={profileImage.src}
        />
      ),
    },
    {
      component: (
        <ProfileFormContainer
          childComponent={PersonalAddressForm}
          data={customerData[FormGroups.SHIPPING_ADDRESS]}
          src={addressShippingImage.src}
        />
      ),
    },
    {
      component: (
        <ProfileFormContainer
          childComponent={PersonalAddressForm}
          data={customerData[FormGroups.BILLING_ADDRESS]}
          src={addressBillingImage.src}
        />
      ),
    },
  ];

  return (
    <div className='profile__container'>
      <FsTabs tabs={tabsName} components={children.map(child => child.component)} />
    </div>
  );
};

export default ProfileContainer;
