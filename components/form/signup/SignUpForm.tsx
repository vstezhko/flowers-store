import React, { useState } from 'react';
import FsAccordion from '@/components/UI/FsAccordion';
import MainPanel from '@/components/form/MainPanel';
import AddressPanel from '@/components/form/AddressPanel';
import FsCheckbox from '@/components/UI/FsCheckbox';

export interface FormItemFieldsParams {
  id: number;
  name?: string;
  type?: string;
  label?: string;
  value?: string;
  data?: FormItemFieldsParams[];
}

const userRegistrationAddressFields: FormItemFieldsParams[] = [
  {
    id: 1,
    name: 'country',
    type: 'text',
    label: 'country',
    value: '',
  },
  {
    id: 2,
    name: 'city',
    type: 'text',
    label: 'city',
    value: '',
  },
  {
    id: 3,
    name: 'streetName',
    type: 'text',
    label: 'street',
    value: '',
  },
  {
    id: 4,
    data: [
      {
        id: 1,
        name: 'building',
        type: 'text',
        label: 'building',
        value: '',
      },
      {
        id: 2,
        name: 'apartment',
        type: 'text',
        label: 'apt.',
        value: '',
      },
      {
        id: 3,
        name: 'postalCode',
        type: 'text',
        label: 'zip code',
        value: '',
      },
    ],
  },
  {
    id: 5,
    name: 'phone',
    type: 'phone',
    label: 'phone',
    value: '',
  },
];
const userRegistrationFields: FormItemFieldsParams[] = [
  {
    id: 1,
    name: 'firstName',
    type: 'text',
    label: 'firstName',
    value: '',
  },
  {
    id: 2,
    name: 'lastName',
    type: 'text',
    label: 'lastName',
    value: '',
  },
  {
    id: 3,
    name: 'email',
    type: 'text',
    label: 'email',
    value: '',
  },
  {
    id: 4,
    name: 'password',
    type: 'password',
    label: 'password',
    value: '',
  },
  {
    id: 5,
    name: 'password',
    type: 'password',
    label: 'repeat password',
    value: '',
  },
];
const SignUpForm = () => {
  const [expanded, setExpanded] = useState<string | false>('panel1');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className='form__content'>
      <FsAccordion name='panel1' expanded={expanded} handleChange={handleChange} summary='Main Info'>
        <div className='form__panel layout-2-columns'>
          <MainPanel data={userRegistrationFields} page='signup' />
        </div>
      </FsAccordion>
      <FsAccordion name='panel2' expanded={expanded} handleChange={handleChange} summary='Address'>
        <div className='layout-2-columns'>
          <div className='panel__item'>
            <AddressPanel data={userRegistrationAddressFields} title='Shipping address' />
          </div>
          <div className='panel__item'>
            <AddressPanel data={userRegistrationAddressFields} title='Billing address' />
          </div>
        </div>
        <FsCheckbox label='use the same data for billing address' />
      </FsAccordion>
    </div>
  );
};

export default SignUpForm;
