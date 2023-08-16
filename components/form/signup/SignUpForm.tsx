import React, { useEffect, useState } from 'react';
import FsAccordion from '@/components/UI/FsAccordion';
import MainPanel from '@/components/form/MainPanel';
import AddressPanel from '@/components/form/AddressPanel';
import FsCheckbox from '@/components/UI/FsCheckbox';
import { FormGroups } from '@/types/enums';
import { formikValuesType, FormItemFieldsParams } from '@/components/form/FormContainer';
import { FormikProps } from 'formik';
import { useMediaQuery } from '@mui/material';

const SignUpForm = (
  data: Record<FormGroups, FormItemFieldsParams[]>,
  formik: FormikProps<formikValuesType>,
  open: Record<string, string | boolean>
) => {
  console.log(open);
  const matches = useMediaQuery('(max-width:500px)');
  const [expanded, setExpanded] = useState<string | false>('panel1');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    if (open.state) setExpanded(open.name as string);
  }, [open]);

  return (
    <div className='form__content'>
      <FsAccordion name='panel1' expanded={expanded} handleChange={handleChange} summary='Main Info'>
        <div className='form__panel layout-2-columns'>
          <MainPanel data={data[FormGroups.CUSTOMER]} page='signup' formik={formik} />
        </div>
      </FsAccordion>
      {!matches ? (
        <FsAccordion name='panel2' expanded={expanded} handleChange={handleChange} summary='Address'>
          <div className='layout-2-columns'>
            <div className='panel__item'>
              <AddressPanel data={data.shippingAddress} title='Shipping address' formik={formik} />
              <FsCheckbox label='use the same data for billing address' />
            </div>
            <div className='panel__item billing'>
              <AddressPanel data={data.billingAddress} title='Billing address' formik={formik} />
            </div>
          </div>
        </FsAccordion>
      ) : (
        <>
          <FsAccordion name='panel2' expanded={expanded} handleChange={handleChange} summary='Shipping address'>
            <div className='panel__item'>
              <AddressPanel data={data.shippingAddress} title='' formik={formik} />
              <FsCheckbox label='use the same data for billing address' />
            </div>
          </FsAccordion>
          <FsAccordion name='panel3' expanded={expanded} handleChange={handleChange} summary='Billing address'>
            <div className='panel__item'>
              <AddressPanel data={data.billingAddress} title='' formik={formik} />
            </div>
          </FsAccordion>
        </>
      )}
    </div>
  );
};

export default SignUpForm;
