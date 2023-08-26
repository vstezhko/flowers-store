import React, { useEffect, useState } from 'react';
import FsAccordion from '@/components/UI/FsAccordion';
import MainPanel from '@/components/form/MainPanel';
import AddressPanel from '@/components/form/AddressPanel';
import FsCheckbox from '@/components/UI/FsCheckbox';
import { FormGroups } from '@/types/enums';
import { FormikProps } from 'formik';
import { useMediaQuery } from '@mui/material';
import { formikValuesType, FormItemFieldsParams } from '@/types/types';

const SignUpForm = (
  data: Record<FormGroups, FormItemFieldsParams[]>,
  formik: FormikProps<formikValuesType>,
  open: Record<string, string | boolean>
) => {
  const matches = useMediaQuery('(max-width:650px)');
  const [expanded, setExpanded] = useState<string | false>('panel1');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    if (open.state) setExpanded(open.name as string);
  }, [open]);

  const [disabled, setDisabled] = useState(false);
  const [shippingAddressValid, setShippingAddressValid] = useState(false);

  const setBillingAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setDisabled(checked);

    if (checked) {
      const formFields = formik.values;
      const newValues = { ...formik.values };
      for (const field in formFields) {
        if (Object.prototype.hasOwnProperty.call(formFields, field)) {
          if (RegExp(`^${FormGroups.SHIPPING_ADDRESS}-`).test(field)) {
            const value = formFields[field];
            const billingField = `${FormGroups.BILLING_ADDRESS}-${field.slice(FormGroups.SHIPPING_ADDRESS.length + 1)}`;
            newValues[billingField] = value;
          }
        }
      }
      formik.setValues(newValues);
    }
  };

  const shippingPanel = (
    <div className='panel__item'>
      <AddressPanel
        data={data.shippingAddress}
        title='Shipping address'
        formik={formik}
        setIsValid={setShippingAddressValid}
      />
      {shippingAddressValid && (
        <FsCheckbox label='use the same data for billing address' onToggle={setBillingAddress} />
      )}
    </div>
  );

  const billingPanel = (
    <div className='panel__item billing'>
      <AddressPanel
        data={data.billingAddress}
        title='Billing address'
        formik={formik}
        disabled={!shippingAddressValid || disabled}
      />
    </div>
  );

  return (
    <div className='form__content'>
      <FsAccordion name='panel1' expanded={expanded} handleChange={handleChange} summary='Main Info'>
        <div className='form__panel layout-2-columns'>
          <MainPanel data={data[FormGroups.CUSTOMER]} page='signup' formik={formik} />
        </div>
      </FsAccordion>
      {!matches ? (
        <FsAccordion
          name='panel2'
          expanded={expanded}
          disabled={open.name !== 'panel2'}
          handleChange={handleChange}
          summary='Address'>
          <div className='layout-2-columns'>
            {shippingPanel}
            {billingPanel}
          </div>
        </FsAccordion>
      ) : (
        <>
          <FsAccordion
            name='panel2'
            expanded={expanded}
            handleChange={handleChange}
            summary='Shipping address'
            disabled={expanded === 'panel1' && open.name !== 'panel3'}>
            {shippingPanel}
          </FsAccordion>
          <FsAccordion
            name='panel3'
            expanded={expanded}
            handleChange={handleChange}
            summary='Billing address'
            disabled={open.name !== 'panel3'}>
            {billingPanel}
          </FsAccordion>
        </>
      )}
    </div>
  );
};

export default SignUpForm;
