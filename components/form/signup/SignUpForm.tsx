import React, { useState } from 'react';
import FsAccordion from '@/components/UI/FsAccordion';
import MainPanel from '@/components/form/MainPanel';
import AddressPanel from '@/components/form/AddressPanel';
import FsCheckbox from '@/components/UI/FsCheckbox';
import { FormGroups } from '@/types/enums';
import { FormItemFieldsParams } from '@/components/form/FormContainer';

const SignUpForm = (data: Record<FormGroups, FormItemFieldsParams[]>) => {
  const [expanded, setExpanded] = useState<string | false>('panel1');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className='form__content'>
      <FsAccordion name='panel1' expanded={expanded} handleChange={handleChange} summary='Main Info'>
        <div className='form__panel layout-2-columns'>
          <MainPanel data={data.customer} page='signup' />
        </div>
      </FsAccordion>
      <FsAccordion name='panel2' expanded={expanded} handleChange={handleChange} summary='Address'>
        <div className='layout-2-columns'>
          <div className='panel__item'>
            <AddressPanel data={data.shippingAddress} title='Shipping address' />
          </div>
          <div className='panel__item'>
            <AddressPanel data={data.billingAddress} title='Billing address' />
          </div>
        </div>
        <FsCheckbox label='use the same data for billing address' />
      </FsAccordion>
    </div>
  );
};

export default SignUpForm;
