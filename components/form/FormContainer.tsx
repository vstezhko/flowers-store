'use client';
import React, { useEffect } from 'react';
import LeafLeft from '@/public/img/png/leaf-left.png';
import LeafRight from '@/public/img/png/leaf-right.png';
import { Paper } from '@mui/material';
import Link from 'next/link';
import Leaf from '@/public/img/png/leaf.png';
import LeafSmall from '@/public/img/png/leaf-small.png';
import { FormikConfig, FormikProps, useFormik } from 'formik';
import { generateInitialFormikValue } from '@/utils/generateInitialFormikValue';
import { FormGroups, FsButtonType, Pages, ValidationRuleGroup } from '@/types/enums';
import FsButton from '@/components/UI/FsButton';
import { generateFormikFieldsRules } from '@/utils/generateFormikFieldsRules';
import { object } from 'yup';
import { useDispatch, useSelector } from '@/redux/store';
import { getCustomerAsync, loginAsync } from '@/redux/slices/loginSlice/thunks';
import { useSnackbar } from 'notistack';
import { TokenService } from '@/api/services/Token.service';
import { getCustomerAccessTokenAsync } from '@/redux/slices/authSlice/thunks';
import { usePathname, useRouter } from 'next/navigation';
import { loginSlice } from '@/redux/slices/loginSlice/loginSlice';

export interface FormItemFieldParams {
  id: number;
  formGroup: FormGroups;
  validationRuleGroup: ValidationRuleGroup;
  name: string;
  type?: string;
  label?: string;
  value?: string[];
}

export interface FormItemUnionFieldsParams {
  id: number | string;
  data?: FormItemFieldsParams[];
}

export type FormItemFieldsParams = FormItemUnionFieldsParams | FormItemFieldParams;

export type formikValuesType = Record<string, string>;

const FormContainer = ({
  childComponent,
  data,
  title,
  path,
  pathName,
  page,
}: {
  childComponent: (
    data: Record<FormGroups, FormItemFieldsParams[]>,
    formik: FormikProps<formikValuesType>
  ) => React.JSX.Element;
  data: Record<string, FormItemFieldsParams[]>;
  title: string;
  path: string;
  pathName: string;
  page: Pages;
}) => {
  const validationSchema = object().shape(generateFormikFieldsRules(data));

  const initialValues: Record<string, string> = generateInitialFormikValue(data);
  const dispatch = useDispatch();
  const { message, variant, isLogin } = useSelector(state => state.login);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const currentPath = usePathname();

  const login = async (values: formikValuesType, token: string) => {
    const loginPayload = {
      email: values['login-email'],
      password: values['login-password'],
    };
    const response = await dispatch(loginAsync({ values: loginPayload, token }));
    if (response.payload) {
      const loginCredentials = {
        username: loginPayload.email,
        password: loginPayload.password,
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

      if (token) {
        if (page === Pages.LOGIN) {
          await login(values, token);
        } else {
          console.log(values);
        }
      }
    },
  };

  useEffect(() => {
    if (isLogin && currentPath === '/login') router.push('/');
  }, [isLogin, currentPath, router]);

  useEffect(() => {
    if (message) {
      enqueueSnackbar(message, { variant });
      dispatch(loginSlice.actions.removeMessage());
    }
  }, [message, variant, enqueueSnackbar, dispatch]);

  const formik: FormikProps<formikValuesType> = useFormik(formikConfig);

  return (
    <div className='form-container__background-img'>
      <div className='background-img background-img_left'>
        <img src={LeafLeft.src} alt='leaf' />
      </div>
      <div className='background-img background-img_right'>
        <img src={LeafRight.src} alt='leaf' />
      </div>
      <Paper elevation={3} className='form__paper'>
        <div className='form__links'>
          <Link href='/'>Home</Link>
          <Link href={path}>{pathName}</Link>
        </div>
        <img src={Leaf.src} alt='leaf' className='form-img' />
        <img src={LeafSmall.src} alt='leaf' className='form-img-bottom' />
        <form className='form' onSubmit={formik.handleSubmit}>
          <h2>{title}</h2>
          {childComponent(data, formik)}
          <FsButton type='submit' className={FsButtonType.REGULAR} label='SEND' />
        </form>
      </Paper>
    </div>
  );
};
export default FormContainer;
