'use client';
import FormContainer, { FormItemFieldsParams } from '@/components/form/FormContainer';
import { FormGroups, Pages, ValidationRuleGroup } from '@/types/enums';
import signUpForm from '@/components/form/signup/SignUpForm';

const shippingAddress: FormItemFieldsParams[] = [
  {
    id: 15,
    formGroup: FormGroups.SHIPPING_ADDRESS,
    validationRuleGroup: ValidationRuleGroup.PHONE,
    name: 'phone',
    type: 'phone',
    label: 'phone',
    value: [],
  },
  {
    id: 11,
    formGroup: FormGroups.SHIPPING_ADDRESS,
    validationRuleGroup: ValidationRuleGroup.COMMON,
    name: 'country',
    type: 'select',
    label: 'country',
    value: [
      { code: 'PL', name: 'Poland' },
      { code: 'DE', name: 'Germany' },
      { code: 'FX', name: 'France' },
    ],
  },
  {
    id: 12,
    formGroup: FormGroups.SHIPPING_ADDRESS,
    validationRuleGroup: ValidationRuleGroup.COMMON,
    name: 'city',
    type: 'text',
    label: 'city',
    value: [],
  },
  {
    id: 13,
    name: 'streetName',
    formGroup: FormGroups.SHIPPING_ADDRESS,
    validationRuleGroup: ValidationRuleGroup.COMMON,
    type: 'text',
    label: 'street',
    value: [],
  },
  {
    id: 14,
    data: [
      {
        id: 111,
        formGroup: FormGroups.SHIPPING_ADDRESS,
        validationRuleGroup: ValidationRuleGroup.COMMON,
        name: 'building',
        type: 'text',
        label: 'building',
        value: [],
      },
      {
        id: 112,
        formGroup: FormGroups.SHIPPING_ADDRESS,
        validationRuleGroup: ValidationRuleGroup.COMMON,
        name: 'apartment',
        type: 'text',
        label: 'apt.',
        value: [],
      },
      {
        id: 113,
        formGroup: FormGroups.SHIPPING_ADDRESS,
        validationRuleGroup: ValidationRuleGroup.COMMON,
        name: 'postalCode',
        type: 'text',
        label: 'zip code',
        value: [],
      },
    ],
  },
];
const billingAddress: FormItemFieldsParams[] = [
  {
    id: 5,
    formGroup: FormGroups.BILLING_ADDRESS,
    validationRuleGroup: ValidationRuleGroup.PHONE,
    name: 'phone',
    type: 'phone',
    label: 'phone',
    value: [],
  },
  {
    id: 1,
    formGroup: FormGroups.BILLING_ADDRESS,
    validationRuleGroup: ValidationRuleGroup.COMMON,
    name: 'country',
    type: 'select',
    label: 'country',
    value: [
      { code: 'PL', name: 'Poland' },
      { code: 'DE', name: 'Germany' },
      { code: 'FX', name: 'France' },
    ],
  },
  {
    id: 2,
    formGroup: FormGroups.BILLING_ADDRESS,
    validationRuleGroup: ValidationRuleGroup.COMMON,
    name: 'city',
    type: 'text',
    label: 'city',
    value: [],
  },
  {
    id: 3,
    name: 'streetName',
    formGroup: FormGroups.BILLING_ADDRESS,
    validationRuleGroup: ValidationRuleGroup.COMMON,
    type: 'text',
    label: 'street',
    value: [],
  },
  {
    id: 4,
    data: [
      {
        id: 10,
        formGroup: FormGroups.BILLING_ADDRESS,
        validationRuleGroup: ValidationRuleGroup.COMMON,
        name: 'building',
        type: 'text',
        label: 'building',
        value: [],
      },
      {
        id: 20,
        formGroup: FormGroups.BILLING_ADDRESS,
        validationRuleGroup: ValidationRuleGroup.COMMON,
        name: 'apartment',
        type: 'text',
        label: 'apt.',
        value: [],
      },
      {
        id: 30,
        formGroup: FormGroups.BILLING_ADDRESS,
        validationRuleGroup: ValidationRuleGroup.COMMON,
        name: 'postalCode',
        type: 'text',
        label: 'zip code',
        value: [],
      },
    ],
  },
];
const mainInputFields: FormItemFieldsParams[] = [
  {
    id: 21,
    formGroup: FormGroups.CUSTOMER,
    validationRuleGroup: ValidationRuleGroup.COMMON,
    name: 'firstName',
    type: 'text',
    label: 'firstName',
    value: [],
  },
  {
    id: 22,
    formGroup: FormGroups.CUSTOMER,
    validationRuleGroup: ValidationRuleGroup.COMMON,
    name: 'lastName',
    type: 'text',
    label: 'lastName',
    value: [],
  },
  {
    id: 23,
    formGroup: FormGroups.CUSTOMER,
    validationRuleGroup: ValidationRuleGroup.EMAIL,
    name: 'email',
    type: 'text',
    label: 'email',
    value: [],
  },
  {
    id: 24,
    formGroup: FormGroups.CUSTOMER,
    validationRuleGroup: ValidationRuleGroup.PASSWORD,
    name: 'password',
    type: 'password',
    label: 'password',
    value: [],
  },
  {
    id: 25,
    formGroup: FormGroups.CUSTOMER,
    validationRuleGroup: ValidationRuleGroup.CONFIRM_PASSWORD,
    name: 'confirmPassword',
    type: 'password',
    label: 'confirm password',
    value: [],
  },
];

const data = {
  [FormGroups.CUSTOMER]: mainInputFields,
  [FormGroups.SHIPPING_ADDRESS]: shippingAddress,
  [FormGroups.BILLING_ADDRESS]: billingAddress,
};
const SignUp = () => {
  return (
    <FormContainer
      childComponent={signUpForm}
      data={data}
      pathName='Login'
      path='/login'
      page={Pages.SIGNUP}
      title='Sign up'
    />
  );
};

export default SignUp;
