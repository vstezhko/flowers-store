import React, { useState } from 'react';
import FsAccordion from '@/components/UI/FsAccordion';
import MainPanel from '@/components/registration/MainPanel';
import AddressPanel from '@/components/registration/AddressPanel';
import FsCheckbox from '@/components/UI/FsCheckbox';
import FsButton from '@/components/UI/FsButton';
import { FsButtonType } from '@/types/enums';

export interface FormItemFieldsParams {
  id: number;
  name?: string;
  type?: string;
  label?: string;
  value?: string;
  data?: FormItemFieldsParams[];
}

const address: FormItemFieldsParams[] = [
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
        id: 5,
        name: 'building',
        type: 'text',
        label: 'building',
        value: '',
      },
      {
        id: 6,
        name: 'apartment',
        type: 'text',
        label: 'apt.',
        value: '',
      },
      {
        id: 7,
        name: 'postalCode',
        type: 'text',
        label: 'zip code',
        value: '',
      },
    ],
  },
  {
    id: 8,
    name: 'phone',
    type: 'phone',
    label: 'phone',
    value: '',
  },
];
const mainInputFields: FormItemFieldsParams[] = [
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
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <form className='auth__form'>
      <h2 className='form__title'>Sign Up</h2>
      <div className='form__content'>
        <FsAccordion name='panel1' expanded={expanded} handleChange={handleChange} summary='Main Info'>
          <div className='form__columns'>
            <MainPanel main={mainInputFields} />
          </div>
        </FsAccordion>
        <FsAccordion name='panel2' expanded={expanded} handleChange={handleChange} summary='Address'>
          <div className='form__columns'>
            <div className='form__fieldset'>
              <AddressPanel address={address} title='Shipping address' />
            </div>
            <div className='form__fieldset'>
              <AddressPanel address={address} title='Billing address' />
            </div>
          </div>
          <FsCheckbox label='use the same data for billing address' />
        </FsAccordion>
      </div>
      <FsButton onClick={() => console.log('loh')} className={FsButtonType.REGULAR} label='SEND' />
    </form>
  );
};

export default SignUpForm;
