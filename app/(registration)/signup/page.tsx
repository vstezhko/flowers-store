'use client';
import FormContainer, { FormItemFieldsParams } from '@/components/form/FormContainer';
import { FormGroups, Pages, ValidationRuleGroup } from '@/types/enums';
import signUpForm from '@/components/form/signup/SignUpForm';

const shippingAddress: FormItemFieldsParams[] = [
  {
    id: 1,
    formGroup: FormGroups.SHIPPING_ADDRESS,
    validationRuleGroup: ValidationRuleGroup.PHONE,
    name: 'phone',
    type: 'phone',
    label: 'phone',
    value: [],
  },
  {
    id: 2,
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
    id: 3,
    formGroup: FormGroups.SHIPPING_ADDRESS,
    validationRuleGroup: ValidationRuleGroup.NAME,
    name: 'city',
    type: 'text',
    label: 'city',
    value: [],
  },
  {
    id: 4,
    name: 'streetName',
    formGroup: FormGroups.SHIPPING_ADDRESS,
    validationRuleGroup: ValidationRuleGroup.COMMON,
    type: 'text',
    label: 'street',
    value: [],
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
        value: [],
      },
      {
        id: 14,
        formGroup: FormGroups.SHIPPING_ADDRESS,
        validationRuleGroup: ValidationRuleGroup.COMMON,
        name: 'apartment',
        type: 'text',
        label: 'apt.',
        value: [],
      },
      {
        id: 15,
        formGroup: FormGroups.SHIPPING_ADDRESS,
        validationRuleGroup: ValidationRuleGroup.POSTAL_CODE_SHIPPING,
        name: 'postalCode',
        type: 'text',
        label: 'zip code',
        value: [],
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
    value: [],
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
    value: [],
  },
  {
    id: 8,
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
    id: 9,
    formGroup: FormGroups.BILLING_ADDRESS,
    validationRuleGroup: ValidationRuleGroup.NAME,
    name: 'city',
    type: 'text',
    label: 'city',
    value: [],
  },
  {
    id: 10,
    name: 'streetName',
    formGroup: FormGroups.BILLING_ADDRESS,
    validationRuleGroup: ValidationRuleGroup.COMMON,
    type: 'text',
    label: 'street',
    value: [],
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
        value: [],
      },
      {
        id: 17,
        formGroup: FormGroups.BILLING_ADDRESS,
        validationRuleGroup: ValidationRuleGroup.COMMON,
        name: 'apartment',
        type: 'text',
        label: 'apt.',
        value: [],
      },
      {
        id: 18,
        formGroup: FormGroups.BILLING_ADDRESS,
        validationRuleGroup: ValidationRuleGroup.POSTAL_CODE_BILLING,
        name: 'postalCode',
        type: 'text',
        label: 'zip code',
        value: [],
      },
    ],
  },
  {
    id: 12,
    name: 'default',
    formGroup: FormGroups.BILLING_ADDRESS,
    validationRuleGroup: ValidationRuleGroup.NOVALIDATE,
    type: 'checkbox',
    label: 'set as default billing address',
    value: [],
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
    value: [],
  },
  {
    id: 20,
    formGroup: FormGroups.CUSTOMER,
    validationRuleGroup: ValidationRuleGroup.NAME,
    name: 'lastName',
    type: 'text',
    label: 'lastName',
    value: [],
  },
  {
    id: 21,
    formGroup: FormGroups.CUSTOMER,
    validationRuleGroup: ValidationRuleGroup.EMAIL,
    name: 'email',
    type: 'text',
    label: 'email',
    value: [],
  },
  {
    id: 22,
    formGroup: FormGroups.CUSTOMER,
    validationRuleGroup: ValidationRuleGroup.NOVALIDATE,
    name: 'birthday',
    type: 'date',
    label: 'birthday',
    value: [],
  },
  {
    id: 23,
    formGroup: FormGroups.CUSTOMER,
    validationRuleGroup: ValidationRuleGroup.PASSWORD,
    name: 'password',
    type: 'password',
    label: 'password',
    value: [],
  },
  {
    id: 24,
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
      pathName='Sign in'
      path='/login'
      page={Pages.SIGNUP}
      title='Sign up'
    />
  );
};

export default SignUp;
