import React from 'react';
import FsButton from '@/components/UI/FsButton';
import { FsButtonType } from '@/types/enums';
import Image from 'next/image';
import { formikValuesType, FormItemFieldsParams } from '@/types/types';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { object } from 'yup';
import { generateFormikFieldsRules } from '@/utils/generateFormikFieldsRules';
import { generateInitialFormikValue } from '@/utils/generateInitialFormikValue';
import { FormikConfig, FormikProps, useFormik } from 'formik';
import { useDispatch } from '@/redux/store';
import { loginSlice } from '@/redux/slices/loginSlice/loginSlice';
import { structureInputValues } from '@/utils/structureInputFormValues';

const ProfileFormContainer = ({
  childComponent,
  data,
  src,
}: {
  childComponent: (
    data1: FormItemFieldsParams[],
    checked: boolean,
    formik1: FormikProps<formikValuesType>
  ) => React.JSX.Element;
  data: FormItemFieldsParams[];
  src: string;
}) => {
  const dispatch = useDispatch();
  const validationSchema = object().shape(generateFormikFieldsRules(data));
  const initialValues: Record<string, string | boolean> = generateInitialFormikValue(data);
  const [checked, setChecked] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const formikConfig: FormikConfig<formikValuesType> = {
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: values => {
      const structuredValues = structureInputValues(values);
      const payload = {
        email: structuredValues.customer.email as string,
        firstName: structuredValues.customer.firstName as string,
        lastName: structuredValues.customer.lastName as string,
        dateOfBirth: structuredValues.customer.dateOfBirth as string,
      };
      dispatch(loginSlice.actions.updateCustomer(payload));
      setChecked(false);
    },
  };

  const formik: FormikProps<formikValuesType> = useFormik(formikConfig);

  React.useEffect(() => {
    if (checked) {
      formik.setValues(initialValues);
    }
  }, [checked]);

  return (
    <>
      <form className='form-customer' onSubmit={formik.handleSubmit}>
        <div className='form__content'>
          <FormControlLabel
            className='switch'
            control={<Switch checked={checked} onChange={handleChange} size='small' />}
            label='EDIT'
          />
          {childComponent(data, checked, formik)}
        </div>
        {checked && (
          <div className='form__btn-container'>
            <FsButton variant='outlined' label='cancel' className={FsButtonType.SMALL} />
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
