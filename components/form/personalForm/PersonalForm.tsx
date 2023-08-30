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
import { updateCustomerAsync } from '@/redux/slices/loginSlice/thunks';
import { AddAddressAction, AddAddressIdAction, ChangeAddressAction, SetDefaultAddressAction } from '@/types/interface';
import { TokenService } from '@/api/services/Token.service';
import { structureInputValues } from '@/utils/structureInputFormValues';

const PersonalForm = ({
  data,
  type,
  childComponent,
  modeEdit,
  typeForm,
}: {
  modeEdit: boolean;
  data: FormItemFieldsParams[];
  type: string;
  typeForm?: string;
  childComponent: (
    data1: FormItemFieldsParams[],
    checked: boolean,
    formik1: FormikProps<formikValuesType>,
    onChangeHandler: (e: React.ChangeEvent) => void,
    modeEdit?: boolean
  ) => React.JSX.Element;
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
    const shippingId = customer?.shippingAddressIds[0] || '';
    const billingId = customer?.billingAddressIds[0] || '';

    const changeAddressAction: ChangeAddressAction = {
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
    };

    const setDefaultAddressAction: SetDefaultAddressAction = {
      action: address === FormGroups.SHIPPING_ADDRESS ? 'setDefaultShippingAddress' : 'setDefaultBillingAddress',
      addressId: structuredValues.default
        ? address === FormGroups.SHIPPING_ADDRESS
          ? shippingId
          : billingId
        : undefined,
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

    const setDefaultAddressAction: SetDefaultAddressAction = {
      action: address === FormGroups.SHIPPING_ADDRESS ? 'setDefaultShippingAddress' : 'setDefaultBillingAddress',
      addressId: undefined,
    };

    const actions: CustomerAddAddressAction[] = [addAddressAction, setDefaultAddressAction];

    await dispatch(updateCustomerAsync({ actions, token, version: customer.version }))
      .then(result => {
        if (updateCustomerAsync.fulfilled.match(result)) {
          const newAddresseId = result.payload.addresses[result.payload.addresses.length - 1].id;

          const addAddressIdAction: AddAddressIdAction = {
            action: address === FormGroups.SHIPPING_ADDRESS ? 'addShippingAddressId' : 'addBillingAddressId',
            addressId: newAddresseId,
          };

          const action: AddAddressIdAction[] = [addAddressIdAction];

          dispatch(updateCustomerAsync({ actions: action, token, version: result.payload.version }));
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const formikConfig: FormikConfig<formikValuesType> = {
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async values => {
      const token = TokenService.getAccessToken();
      const structuredValues = structureInputValues(values);
      if (type === FormGroups.CUSTOMER) {
        await changePersonalData(structuredValues, token);
      } else if (type === FormGroups.SHIPPING_ADDRESS && typeForm === 'edit') {
        await changeAddressesData(structuredValues.shippingAddress, token, FormGroups.SHIPPING_ADDRESS);
      } else if (type === FormGroups.BILLING_ADDRESS && typeForm === 'edit') {
        await changeAddressesData(structuredValues.billingAddress, token, FormGroups.BILLING_ADDRESS);
      } else if (type === FormGroups.SHIPPING_ADDRESS && typeForm === 'add') {
        await addNewAddresses(structuredValues.shippingAddress, token, FormGroups.SHIPPING_ADDRESS);
      } else if (type === FormGroups.BILLING_ADDRESS && typeForm === 'add') {
        await addNewAddresses(structuredValues.billingAddress, token, FormGroups.BILLING_ADDRESS);
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
          {modeEdit && (
            <FsButton
              variant='outlined'
              label='cancel'
              className={FsButtonType.SMALL}
              onClick={handleCancelUpdateData}
            />
          )}
          <FsButton label={modeEdit ? 'save' : 'add'} type='submit' className={FsButtonType.SMALL} />
        </div>
      )}
    </form>
  );
};

export default PersonalForm;
