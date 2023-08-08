'use client';
import LeafLeft from '@/public/img/png/leaf-left.png';
import LeafRight from '@/public/img/png/leaf-right.png';
import Leaf from '@/public/img/png/leaf.png';
import { Paper } from '@mui/material';
import FsInput from '@/components/FsInput';
import FsButton from '@/components/FsButton';
import { FsButtonType } from '@/types/enums';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import FsCheckbox from '@/components/FsCheckbox';

interface FormItemFieldsParams {
  id: number;
  name: string;
  type: string;
  label: string;
  page: number;
  value: string;
}

const mainInputFields: FormItemFieldsParams[] = [
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
const address: FormItemFieldsParams[] = [
  {
    id: 1,
    name: 'country',
    type: 'text',
    label: 'country',
    page: 1,
    value: '',
  },
  {
    id: 2,
    name: 'city',
    type: 'text',
    label: 'city',
    page: 1,
    value: '',
  },
  {
    id: 3,
    name: 'streetName',
    type: 'text',
    label: 'street',
    page: 1,
    value: '',
  },
  {
    id: 4,
    name: 'building',
    type: 'text',
    label: 'building',
    page: 1,
    value: '',
  },
  {
    id: 5,
    name: 'apartment',
    type: 'text',
    label: 'apartment',
    page: 1,
    value: '',
  },
  {
    id: 6,
    name: 'postalCode',
    type: 'text',
    label: 'postal code',
    page: 1,
    value: '',
  },
  {
    id: 7,
    name: 'phone',
    type: 'phone',
    label: 'phone',
    page: 1,
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
        <img src={Leaf.src} alt='leaf' className='form-img' />
        <form className='auth__form'>
          <h2 className='form__title'>Sign Up</h2>
          <div className='form__content'>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1bh-content' id='panel1bh-header'>
                <h4>Main Info</h4>
              </AccordionSummary>
              <AccordionDetails>
                <div className='form__columns'>
                  <div className='form__fieldset'>
                    {mainInputFields.map((input: FormItemFieldsParams) => (
                      <FsInput key={input.id} label={input.label} type={input.type} errorText={'dcfvgbnm'} />
                    ))}
                  </div>
                  <div className='form__fieldset'></div>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel2bh-content' id='panel2bh-header'>
                <h4>Address</h4>
              </AccordionSummary>
              <AccordionDetails>
                <div className='form__columns'>
                  <div className='form__fieldset'>
                    <h5>Shipping Address</h5>
                    {address.map((input: FormItemFieldsParams) => (
                      <FsInput key={input.id} label={input.label} type={input.type} />
                    ))}
                    <FsCheckbox label='set as default shipping address' />
                  </div>
                  <div className='form__fieldset'>
                    <h5>Billing Address</h5>
                    {address.map((input: FormItemFieldsParams) => (
                      <FsInput key={input.id} label={input.label} type={input.type} />
                    ))}
                    <FsCheckbox label='set as default billing address' />
                  </div>
                </div>
                <FsCheckbox label='use the same data for both billing' />
              </AccordionDetails>
            </Accordion>
          </div>

          <FsButton onClick={() => console.log('loh')} className={FsButtonType.REGULAR} label='SEND' />
        </form>
      </Paper>
    </div>
  );
};

export default Registration;
