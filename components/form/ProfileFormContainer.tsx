import React, { ChangeEvent, useEffect, useState } from 'react';
import FsButton from '@/components/UI/FsButton';
import { FormGroups, FsButtonType } from '@/types/enums';
import Image from 'next/image';
import { formikValuesType, FormItemFieldsParams } from '@/types/types';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { object } from 'yup';
import { generateFormikFieldsRules } from '@/utils/generateFormikFieldsRules';
import { generateInitialFormikValue } from '@/utils/generateInitialFormikValue';
import { FormikConfig, FormikProps, useFormik } from 'formik';
import { useDispatch, useSelector } from '@/redux/store';
import { structureInputValues } from '@/utils/structureInputFormValues';
import { updateCustomerAsync } from '@/redux/slices/loginSlice/thunks';
import { TokenService } from '@/api/services/Token.service';

const ProfileFormContainer = ({
  childComponent,
  data,
  src,
  type,
}: {
  childComponent: (
    data1: FormItemFieldsParams[],
    checked: boolean,
    formik1: FormikProps<formikValuesType>,
    onChangeHandler: (e: React.ChangeEvent<any>) => void
  ) => React.JSX.Element;
  data: FormItemFieldsParams[];
  src: string;
  type: string;
}) => {
  const dispatch = useDispatch();
  const validationSchema = object().shape(generateFormikFieldsRules(data));
  const initialValues: Record<string, string | boolean> = generateInitialFormikValue(data);
  const [checked, setChecked] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const { customer } = useSelector(state => state.login);

  const changePersonalData = async (
    structuredValues: Record<FormGroups, Record<string, string | boolean>>,
    token: string
  ) => {
    const actions = [
      {
        action: 'changeEmail',
        email: structuredValues.customer.email as string,
      },
      {
        action: 'setFirstName',
        firstName: structuredValues.customer.firstName as string,
      },
      {
        action: 'setLastName',
        lastName: structuredValues.customer.lastName as string,
      },
      {
        action: 'setDateOfBirth',
        dateOfBirth: structuredValues.customer.dateOfBirth as string,
      },
    ];
    await dispatch(updateCustomerAsync({ actions, token, version: customer.version }));
  };

  const changeAddressesData = async (
    structuredValues: Record<string, string | boolean>,
    token: string,
    address: string
  ) => {
    const shippingId = customer?.shippingAddressIds[0] || [];
    const billingId = customer?.billingAddressIds[0] || [];
    const actions = [
      {
        action: 'changeAddress',
        addressId: address === FormGroups.SHIPPING_ADDRESS ? shippingId : billingId,
        address: {
          streetName: structuredValues.streetName as string,
          building: structuredValues.building as string,
          postalCode: structuredValues.postalCode as string,
          apartment: structuredValues.apartment as string,
          city: structuredValues.city as string,
          country: structuredValues.country as string,
          phone: structuredValues.phone as string,
        },
      },
      {
        action: address === FormGroups.SHIPPING_ADDRESS ? 'setDefaultShippingAddress' : 'setDefaultBillingAddress',
        addressId: structuredValues.default ? (address === FormGroups.SHIPPING_ADDRESS ? shippingId : billingId) : '',
      },
    ];

    console.log(actions);
  };

  const formikConfig: FormikConfig<formikValuesType> = {
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async values => {
      const token = TokenService.getAccessToken();
      const structuredValues = structureInputValues(values);
      console.log(structuredValues);
      if (type === FormGroups.CUSTOMER) {
        await changePersonalData(structuredValues, token);
      } else if (type === FormGroups.SHIPPING_ADDRESS) {
        await changeAddressesData(structuredValues.shippingAddress, token, FormGroups.SHIPPING_ADDRESS);
      } else {
        await changeAddressesData(structuredValues.billingAddress, token, FormGroups.BILLING_ADDRESS);
      }

      setChecked(false);
    },
  };

  const formik: FormikProps<formikValuesType> = useFormik(formikConfig);

  useEffect(() => {
    formik.setValues(initialValues);
  }, [data]);

  const handleCancelUpdateData = () => {
    formik.setValues(initialValues);
    setChecked(false);
  };

  const onChangeHandler = (e: ChangeEvent<any>) => {
    formik.setFieldTouched('type');
    formik.handleChange(e);
  };

  return (
    <>
      <form className='form-customer' onSubmit={formik.handleSubmit}>
        <div className='form__content'>
          <FormControlLabel
            className='switch'
            control={<Switch checked={checked} onChange={handleChange} size='small' />}
            label='EDIT'
          />
          {childComponent(data, checked, formik, onChangeHandler)}
        </div>
        {checked && (
          <div className='form__btn-container'>
            <FsButton
              variant='outlined'
              label='cancel'
              className={FsButtonType.SMALL}
              onClick={handleCancelUpdateData}
            />
            <FsButton label='save' type='submit' className={FsButtonType.SMALL} />
          </div>
        )}
      </form>
      <div className='profile__container-img'>
        <Image className='profile__img' src={src} alt='ProfileContainer photo' layout='fill' />
      </div>
    </>
  );
};

export default ProfileFormContainer;
