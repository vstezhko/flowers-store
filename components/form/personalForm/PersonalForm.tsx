import React, { ChangeEvent, useEffect, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FsButton from '@/components/UI/FsButton';
import { FormGroups, FsButtonType } from '@/types/enums';
import { FormikConfig, FormikProps, useFormik } from 'formik';
import {
  CustomerAction,
  CustomerAddAddressAction,
  CustomerAddressAction,
  formikValuesType,
  FormItemFieldsParams,
} from '@/types/types';
import { useDispatch, useSelector } from '@/redux/store';
import { object } from 'yup';
import { generateFormikFieldsRules } from '@/utils/generateFormikFieldsRules';
import { generateInitialFormikValue } from '@/utils/generateInitialFormikValue';
import { changePasswordAsync, getCustomerAsync, updateCustomerAsync } from '@/redux/slices/loginSlice/thunks';
import { AddAddressAction, AddAddressIdAction, ChangeAddressAction, SetDefaultAddressAction } from '@/types/interface';
import { TokenService } from '@/api/services/Token.service';
import { structureInputValues } from '@/utils/structureInputFormValues';
import { loginSlice } from '@/redux/slices/loginSlice/loginSlice';
import { getCustomerAccessTokenAsync } from '@/redux/slices/authSlice/thunks';

const PersonalForm = ({
  data,
  type,
  childComponent,
  modeEdit,
  typeForm,
  onSuccess,
}: {
  modeEdit: boolean;
  data: FormItemFieldsParams[];
  type: string;
  typeForm?: Record<string, string> | null;
  onSuccess?: () => void | undefined;
  childComponent: (
    data1: FormItemFieldsParams[],
    checked: boolean,
    formik1: FormikProps<formikValuesType>,
    onChangeHandler: (e: React.ChangeEvent) => void,
    modeEdit?: boolean | undefined
  ) => React.JSX.Element;
}) => {
  const dispatch = useDispatch();
  const validationSchema = object().shape(generateFormikFieldsRules(data));
  const initialValues: Record<string, string | boolean> = generateInitialFormikValue(data);
  const [checked, setChecked] = useState(false);

  const { customer } = useSelector(state => state.login);

  const changePersonalData = async (
    structuredValues: Record<FormGroups, Record<string, string | boolean>>,
    token: string
  ) => {
    const actions: CustomerAction[] = [
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
    const addressId = typeForm?.id;

    const changeAddressAction: ChangeAddressAction = {
      action: 'changeAddress',
      addressId: addressId as string,
      address: {
        streetName: structuredValues.streetName as string,
        building: structuredValues.building as string,
        postalCode: structuredValues.postalCode as string,
        apartment: structuredValues.apartment as string,
        city: structuredValues.city as string,
        country: structuredValues.country as string,
        phone: structuredValues.phone as string,
      },
    };

    const setDefaultAddressAction: SetDefaultAddressAction = {
      action: address === FormGroups.SHIPPING_ADDRESS ? 'setDefaultShippingAddress' : 'setDefaultBillingAddress',
      addressId: structuredValues.default ? addressId : undefined,
    };

    const actions: CustomerAddressAction[] = [changeAddressAction, setDefaultAddressAction];

    await dispatch(updateCustomerAsync({ actions, token, version: customer.version }));
  };

  const addNewAddresses = async (
    structuredValues: Record<string, string | boolean>,
    token: string,
    address: string
  ) => {
    const addAddressAction: AddAddressAction = {
      action: 'addAddress',
      address: {
        streetName: structuredValues.streetName as string,
        building: structuredValues.building as string,
        postalCode: structuredValues.postalCode as string,
        apartment: structuredValues.apartment as string,
        city: structuredValues.city as string,
        country: structuredValues.country as string,
        phone: structuredValues.phone as string,
      },
    };

    const actions: AddAddressAction[] = [addAddressAction];
    await dispatch(loginSlice.actions.isNewAddress(false));
    await dispatch(updateCustomerAsync({ actions, token, version: customer.version }))
      .then(result => {
        if (updateCustomerAsync.fulfilled.match(result)) {
          const newAddressId = result.payload.addresses[result.payload.addresses.length - 1].id;

          const addAddressIdAction: AddAddressIdAction = {
            action: address === FormGroups.SHIPPING_ADDRESS ? 'addShippingAddressId' : 'addBillingAddressId',
            addressId: newAddressId,
          };

          const setDefaultAddressAction: SetDefaultAddressAction = {
            action: address === FormGroups.SHIPPING_ADDRESS ? 'setDefaultShippingAddress' : 'setDefaultBillingAddress',
            addressId: structuredValues.default ? newAddressId : undefined,
          };

          const action: CustomerAddAddressAction[] = [addAddressIdAction, setDefaultAddressAction];
          dispatch(updateCustomerAsync({ actions: action, token, version: result.payload.version }));
          dispatch(loginSlice.actions.isNewAddress(true));
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const changePassword = async (
    structuredValues: Record<FormGroups, Record<string, string | boolean>>,
    token: string
  ) => {
    const passwords = {
      currentPassword: structuredValues.customer.currentPassword as string,
      newPassword: structuredValues.customer.password as string,
    };

    const result = await dispatch(changePasswordAsync({ passwords, token, version: customer.version }));
    if (result.payload) {
      const loginCredentials = {
        username: result.payload.email as string,
        password: passwords.newPassword as string,
      };
      const customerToken = await dispatch(getCustomerAccessTokenAsync(loginCredentials));
      if (customerToken.payload.access_token) {
        dispatch(getCustomerAsync(customerToken.payload.access_token));
      }
    }
  };

  const formikConfig: FormikConfig<formikValuesType> = {
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async values => {
      const token = TokenService.getAccessToken();
      const structuredValues = structureInputValues(values);
      if (type === FormGroups.CUSTOMER) {
        await changePersonalData(structuredValues, token);
      } else if (type === 'password') {
        await changePassword(structuredValues, token);
      } else if (type === FormGroups.SHIPPING_ADDRESS && typeForm?.name === 'edit') {
        await changeAddressesData(structuredValues.shippingAddress, token, FormGroups.SHIPPING_ADDRESS);
      } else if (type === FormGroups.BILLING_ADDRESS && typeForm?.name === 'edit') {
        await changeAddressesData(structuredValues.billingAddress, token, FormGroups.BILLING_ADDRESS);
      } else if (type === FormGroups.SHIPPING_ADDRESS && typeForm?.name === 'add') {
        await addNewAddresses(structuredValues.shippingAddress, token, FormGroups.SHIPPING_ADDRESS);
      } else if (type === FormGroups.BILLING_ADDRESS && typeForm?.name === 'add') {
        await addNewAddresses(structuredValues.billingAddress, token, FormGroups.BILLING_ADDRESS);
      }
      setChecked(false);
      if (onSuccess) {
        onSuccess();
      }
    },
  };

  const formik: FormikProps<formikValuesType> = useFormik(formikConfig);

  const resetForm = () => {
    formik.resetForm();
  };

  useEffect(() => {
    formik.setValues(initialValues);
    if (type === 'password') {
      formik.resetForm();
    }
  }, [data]);

  const handleCancelUpdateData = () => {
    formik.setValues(initialValues);
    setChecked(false);
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (checked) {
      formik.setValues(initialValues);
    }
    setChecked(event.target.checked);
  };

  const onChangeHandler = (e: ChangeEvent) => {
    formik.setFieldTouched('type');
    formik.handleChange(e);
  };

  return (
    <form className='form-customer' onSubmit={formik.handleSubmit}>
      <div className='form__content'>
        {modeEdit && (
          <FormControlLabel
            className='switch'
            control={<Switch checked={checked} onChange={handleChange} size='small' />}
            label='EDIT'
          />
        )}
        {childComponent(data, checked, formik, onChangeHandler, modeEdit)}
      </div>
      {(checked || !modeEdit) && (
        <div className='form__btn-container'>
          <FsButton
            variant='outlined'
            label='cancel'
            className={FsButtonType.SMALL}
            onClick={type === 'password' ? resetForm : handleCancelUpdateData}
          />
          <FsButton label={typeForm?.name === 'add' ? 'add' : 'save'} type='submit' className={FsButtonType.SMALL} />
        </div>
      )}
    </form>
  );
};

export default PersonalForm;
