'use client';
import LeafLeft from '@/public/img/png/leaf-left.png';
import LeafRight from '@/public/img/png/leaf-right.png';
import Leaf from '@/public/img/png/leaf.png';
import LeafSmall from '@/public/img/png/leaf-small.png';
import { Paper } from '@mui/material';
import FsButton from '@/components/UI/FsButton';
import { FsButtonType } from '@/types/enums';
import { useState } from 'react';
import FsCheckbox from '@/components/UI/FsCheckbox';
import FsAccordion from '@/components/UI/FsAccordion';
import AddressPanel from '@/components/registration/AddressPanel';
import Link from 'next/link';
import MainPanel from '@/components/registration/MainPanel';

export interface FormItemFieldsParams {
  id: number;
  name?: string;
  type?: string;
  label?: string;
  value?: string;
  data?: FormItemFieldsParams[];
}

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
        label: 'apartment',
        value: '',
      },
      {
        id: 7,
        name: 'postalCode',
        type: 'text',
        label: 'postal code',
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
const Registration = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className='signup auth__background-img'>
      <div className='background-img background-img_left'>
        <img src={LeafLeft.src} alt='leaf' />
      </div>
      <div className='background-img background-img_right'>
        <img src={LeafRight.src} alt='leaf' />
      </div>
      <Paper elevation={3} className='signup__paper'>
        <div className='page-links'>
          <Link href='/'>Home</Link>
          <Link href='/login'>Login</Link>
        </div>
        <img src={Leaf.src} alt='leaf' className='form-img' />
        <img src={LeafSmall.src} alt='leaf' className='form-img-bottom' />
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
              <FsCheckbox label='use the same data for both billing' />
            </FsAccordion>
          </div>
          <FsButton onClick={() => console.log('loh')} className={FsButtonType.REGULAR} label='SEND' />
        </form>
      </Paper>
    </div>
  );
};

export default Registration;
