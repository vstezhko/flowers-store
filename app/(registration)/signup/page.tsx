'use client';
import FormContainer, { FormItemFieldsParams } from '@/components/form/FormContainer';
import { FormGroups, ValidationRuleGroup } from '@/types/enums';
import signUpForm from '@/components/form/signup/SignUpForm';

const shippingAddress: FormItemFieldsParams[] = [
  {
    id: 1,
    formGroup: FormGroups.SHIPPING_ADDRESS,
    validationRuleGroup: ValidationRuleGroup.COMMON,
    name: 'country',
    type: 'text',
    label: 'country',
    value: '',
  },
  {
    id: 2,
    formGroup: FormGroups.SHIPPING_ADDRESS,
    validationRuleGroup: ValidationRuleGroup.COMMON,
    name: 'city',
    type: 'text',
    label: 'city',
    value: '',
  },
  {
    id: 3,
    name: 'streetName',
    formGroup: FormGroups.SHIPPING_ADDRESS,
    validationRuleGroup: ValidationRuleGroup.COMMON,
    type: 'text',
    label: 'street',
    value: '',
  },
  {
    id: 4,
    data: [
      {
        id: 1,
        formGroup: FormGroups.SHIPPING_ADDRESS,
        validationRuleGroup: ValidationRuleGroup.COMMON,
        name: 'building',
        type: 'text',
        label: 'building',
        value: '',
      },
      {
        id: 2,
        formGroup: FormGroups.SHIPPING_ADDRESS,
        validationRuleGroup: ValidationRuleGroup.COMMON,
        name: 'apartment',
        type: 'text',
        label: 'apt.',
        value: '',
      },
      {
        id: 3,
        formGroup: FormGroups.SHIPPING_ADDRESS,
        validationRuleGroup: ValidationRuleGroup.COMMON,
        name: 'postalCode',
        type: 'text',
        label: 'zip code',
        value: '',
      },
    ],
  },
  {
    id: 5,
    formGroup: FormGroups.SHIPPING_ADDRESS,
    validationRuleGroup: ValidationRuleGroup.COMMON,
    name: 'phone',
    type: 'phone',
    label: 'phone',
    value: '',
  },
];
const billingAddress: FormItemFieldsParams[] = [
  {
    id: 1,
    formGroup: FormGroups.BILLING_ADDRESS,
    validationRuleGroup: ValidationRuleGroup.COMMON,
    name: 'country',
    type: 'text',
    label: 'country',
    value: '',
  },
  {
    id: 2,
    formGroup: FormGroups.BILLING_ADDRESS,
    validationRuleGroup: ValidationRuleGroup.COMMON,
    name: 'city',
    type: 'text',
    label: 'city',
    value: '',
  },
  {
    id: 3,
    name: 'streetName',
    formGroup: FormGroups.BILLING_ADDRESS,
    validationRuleGroup: ValidationRuleGroup.COMMON,
    type: 'text',
    label: 'street',
    value: '',
  },
  {
    id: 4,
    data: [
      {
        id: 1,
        formGroup: FormGroups.BILLING_ADDRESS,
        validationRuleGroup: ValidationRuleGroup.COMMON,
        name: 'building',
        type: 'text',
        label: 'building',
        value: '',
      },
      {
        id: 2,
        formGroup: FormGroups.BILLING_ADDRESS,
        validationRuleGroup: ValidationRuleGroup.COMMON,
        name: 'apartment',
        type: 'text',
        label: 'apt.',
        value: '',
      },
      {
        id: 3,
        formGroup: FormGroups.BILLING_ADDRESS,
        validationRuleGroup: ValidationRuleGroup.COMMON,
        name: 'postalCode',
        type: 'text',
        label: 'zip code',
        value: '',
      },
    ],
  },
  {
    id: 5,
    formGroup: FormGroups.BILLING_ADDRESS,
    validationRuleGroup: ValidationRuleGroup.COMMON,
    name: 'phone',
    type: 'phone',
    label: 'phone',
    value: '',
  },
];
const mainInputFields: FormItemFieldsParams[] = [
  {
    id: 1,
    formGroup: FormGroups.CUSTOMER,
    validationRuleGroup: ValidationRuleGroup.COMMON,
    name: 'firstName',
    type: 'text',
    label: 'firstName',
    value: '',
  },
  {
    id: 2,
    formGroup: FormGroups.CUSTOMER,
    validationRuleGroup: ValidationRuleGroup.COMMON,
    name: 'lastName',
    type: 'text',
    label: 'lastName',
    value: '',
  },
  {
    id: 3,
    formGroup: FormGroups.CUSTOMER,
    validationRuleGroup: ValidationRuleGroup.EMAIL,
    name: 'email',
    type: 'text',
    label: 'email',
    value: '',
  },
  {
    id: 4,
    formGroup: FormGroups.CUSTOMER,
    validationRuleGroup: ValidationRuleGroup.PASSWORD,
    name: 'password',
    type: 'password',
    label: 'password',
    value: '',
  },
  {
    id: 5,
    formGroup: FormGroups.CUSTOMER,
    validationRuleGroup: ValidationRuleGroup.PASSWORD,
    name: 'password',
    type: 'password',
    label: 'repeat password',
    value: '',
  },
];

const data = {
  [FormGroups.CUSTOMER]: mainInputFields,
  [FormGroups.SHIPPING_ADDRESS]: shippingAddress,
  [FormGroups.BILLING_ADDRESS]: billingAddress,
};
const SignUp = () => {
  return <FormContainer childComponent={signUpForm} data={data} pathName='Login' path='/login' title='Sign up' />;
};

export default SignUp;
