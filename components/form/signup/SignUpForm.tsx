import React, { useState } from 'react';
import FsAccordion from '@/components/UI/FsAccordion';
import MainPanel from '@/components/signup/MainPanel';
import AddressPanel from '@/components/signup/AddressPanel';
import FsCheckbox from '@/components/UI/FsCheckbox';
import { FormGroups } from '@/types/enums';
import { FormItemFieldsParams } from '@/components/form/FormContainer';

const SignUpForm = (data: Record<FormGroups, FormItemFieldsParams[]>) => {
  const [expanded, setExpanded] = useState<string | false>('panel1');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className='signup__content'>
      <FsAccordion name='panel1' expanded={expanded} handleChange={handleChange} summary='Main Info'>
        <div className='layout-2-columns'>
          <MainPanel main={data.customer} />
        </div>
      </FsAccordion>
      <FsAccordion name='panel2' expanded={expanded} handleChange={handleChange} summary='Address'>
        <div className='layout-2-columns'>
          <div className='signup__item'>
            <AddressPanel address={data.shippingAddress} title='Shipping address' />
          </div>
          <div className='signup__item'>
            <AddressPanel address={data.billingAddress} title='Billing address' />
          </div>
        </div>
        <FsCheckbox label='use the same data for billing address' />
      </FsAccordion>
    </div>
  );
};

export default SignUpForm;
