'use client';
import LeafLeft from '@/public/img/png/leaf-left.png';
import LeafRight from '@/public/img/png/leaf-right.png';
import Leaf from '@/public/img/png/leaf.png';
import { Paper } from '@mui/material';
import FsInput from '@/components/FsInput';
// import { useState } from 'react';
import FsButton from '@/components/FsButton';
import { FsButtonType } from '@/types/enums';

interface MainInputFieldsParams {
  id: number;
  name: string;
  type: string;
  label: string;
  page: number;
  value: string;
}

// interface AdditionalInputFieldsParams {
//   id: number;
//   name: string;
//   type: string;
//   label: string;
//   page: number;
//   value: string;
// }

const mainInputFields: MainInputFieldsParams[] = [
  {
    id: 1,
    name: 'firstName',
    type: 'text',
    label: 'firstName',
    page: 1,
    value: '',
  },
  {
    id: 2,
    name: 'lastName',
    type: 'text',
    label: 'lastName',
    page: 1,
    value: '',
  },
  {
    id: 3,
    name: 'email',
    type: 'text',
    label: 'email',
    page: 1,
    value: '',
  },
  {
    id: 4,
    name: 'password',
    type: 'password',
    label: 'password',
    page: 1,
    value: '',
  },
  {
    id: 5,
    name: 'password',
    type: 'password',
    label: 'repeat password',
    page: 1,
    value: '',
  },
];
// const address: MainInputFieldsParams[] = [
//   {
//     id: 1,
//     name: 'country',
//     type: 'text',
//     label: 'country',
//     page: 1,
//     value: '',
//   },
//   {
//     id: 2,
//     name: 'city',
//     type: 'text',
//     label: 'city',
//     page: 1,
//     value: '',
//   },
//   {
//     id: 3,
//     name: 'streetName',
//     type: 'text',
//     label: 'street',
//     page: 1,
//     value: '',
//   },
//   {
//     id: 4,
//     name: 'building',
//     type: 'text',
//     label: 'building',
//     page: 1,
//     value: '',
//   },
//   {
//     id: 5,
//     name: 'apartment',
//     type: 'text',
//     label: 'apartment',
//     page: 1,
//     value: '',
//   },
//   {
//     id: 6,
//     name: 'postalCode',
//     type: 'text',
//     label: 'postal code',
//     page: 1,
//     value: '',
//   },
//   {
//     id: 7,
//     name: 'phone',
//     type: 'phone',
//     label: 'phone',
//     page: 1,
//     value: '',
//   },
// ];
// const additionalInputFields: AdditionalInputFieldsParams[] = [{
//   shippingAddress: []
// },
//   // {
//   //   id: 1,
//   //   name: 'firstName',
//   //   type: 'text',
//   //   label: 'firstName',
//   //   page: 1,
//   //   value: '',
//   // },
//   {
//     id: 2,
//     name: 'lastName',
//     type: 'text',
//     label: 'lastName',
//     page: 1,
//     value: '',
//   },
//   {
//     id: 3,
//     name: 'email',
//     type: 'text',
//     label: 'email',
//     page: 1,
//     value: '',
//   },
//   {
//     id: 4,
//     name: 'password',
//     type: 'password',
//     label: 'password',
//     page: 1,
//     value: '',
//   },
//   {
//     id: 5,
//     name: 'password',
//     type: 'password',
//     label: 'repeat password',
//     page: 1,
//     value: '',
//   },
// ];

const Registration = () => {
  // const [isFilled, setIsFilled] = useState(false);

  return (
    <div className='login__background-img'>
      <div className='background-img background-img_left'>
        <img src={LeafLeft.src} alt='leaf' />
      </div>
      <div className='background-img background-img_right'>
        <img src={LeafRight.src} alt='leaf' />
      </div>
      <Paper elevation={3}>
        <img src={Leaf.src} alt='leaf' className='form-img' />
        <form className='login__form'>
          <h2 className='form__title'>Sign Up</h2>
          <div className='form__content'>
            <div className='content'>
              {mainInputFields.map((input: MainInputFieldsParams) => (
                <FsInput key={input.id} label={input.label} type={input.type} />
              ))}
            </div>
            <div className='content'>
              {/*{mainInputFields.map((input: InputFieldsParams) => (*/}
              {/*  <FsInput key={input.id} label={input.label} type={input.type} />*/}
              {/*))}*/}
            </div>
          </div>
          <FsButton onClick={() => console.log('loh')} className={FsButtonType.REGULAR} label='SEND' />
        </form>
      </Paper>
    </div>
  );
};

export default Registration;
