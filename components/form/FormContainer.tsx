'use client';
import React, { useEffect, useState } from 'react';
import LeafLeft from '@/public/img/png/leaf-left.png';
import LeafRight from '@/public/img/png/leaf-right.png';
import { Paper } from '@mui/material';
import Link from 'next/link';
import Leaf from '@/public/img/png/leaf.png';
import LeafSmall from '@/public/img/png/leaf-small.png';
import { FormikConfig, FormikProps, useFormik } from 'formik';
import { generateInitialFormikValue } from '@/utils/generateInitialFormikValue';
import { FormGroups, FsButtonType, ValidationRuleGroup } from '@/types/enums';
import FsButton from '@/components/UI/FsButton';
import { generateFormikFieldsRules } from '@/utils/generateFormikFieldsRules';
import { object } from 'yup';
import { useDispatch, useSelector } from '@/redux/store';
import { loginAsync } from '@/redux/slices/loginSlice/thunks';
import { useSnackbar } from 'notistack';
import { TokenService } from '@/api/services/Token.service';
import { getCustomerAccessTokenAsync } from '@/redux/slices/authSlice/thunks';
import { loginSlice } from '@/redux/slices/loginSlice/loginSlice';
import { usePathname, useRouter } from 'next/navigation';

export interface FormItemFieldParams {
  id: number;
  formGroup: FormGroups;
  validationRuleGroup: ValidationRuleGroup;
  name: string;
  type?: string;
  label?: string;
  value?: string;
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
}: {
  childComponent: (
    data: Record<FormGroups, FormItemFieldsParams[]>,
    formik: FormikProps<formikValuesType>
  ) => React.JSX.Element;
  data: Record<string, FormItemFieldsParams[]>;
  title: string;
  path: string;
  pathName: string;
}) => {
  const validationSchema = object().shape(generateFormikFieldsRules(data));

  const initialValues: Record<string, string> = generateInitialFormikValue(data);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { message, variant, isLogin } = useSelector(state => state.login);
  const router = useRouter();
  const [token, setToken] = useState('');
  const currentPath = usePathname();

  useEffect(() => {
    const access_token = TokenService.getAccessToken();
    if (access_token) setToken(access_token);
  }, [token]);

  const formikConfig: FormikConfig<formikValuesType> = {
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async values => {
      if (token) {
        const response = await dispatch(
          loginAsync({
            values: {
              email: values['login-email'],
              password: values['login-password'],
            },
            token: token,
          })
        );

        if (response.payload) {
          dispatch(
            getCustomerAccessTokenAsync({
              username: values['login-email'],
              password: values['login-password'],
            })
          );
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
      dispatch(loginSlice.actions.removeMessage);
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
