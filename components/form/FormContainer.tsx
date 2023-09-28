'use client';
import React, { useCallback, useEffect, useState } from 'react';
import LeafLeft from '@/public/img/png/leaf-left.webp';
import LeafRight from '@/public/img/png/leaf-right.webp';
import { Paper, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import Leaf from '@/public/img/png/leaf.webp';
import LeafSmall from '@/public/img/png/leaf-small.webp';
import { FormikConfig, FormikProps, useFormik } from 'formik';
import { generateInitialFormikValue } from '@/utils/generateInitialFormikValue';
import { FormGroups, FsButtonType, Pages, TokenType } from '@/types/enums';
import FsButton from '@/components/UI/FsButton';
import { generateFormikFieldsRules } from '@/utils/generateFormikFieldsRules';
import { object } from 'yup';
import { useDispatch } from '@/redux/store';
import { loginAsync, signUpAsync } from '@/redux/slices/loginSlice/thunks';
import { TokenService } from '@/api/services/Token.service';
import { getCustomerAccessTokenAsync } from '@/redux/slices/authSlice/thunks';
import { usePathname, useRouter } from 'next/navigation';
import { deletePrefixKey } from '@/utils/deletePrefixKey';
import { structureInputValues } from '@/utils/structureInputFormValues';
import { createCustomerDraft } from '@/utils/createCustomerDraft';
import { formikValuesType, FormItemFieldsParams } from '@/types/types';
import Image from 'next/image';
import { cartSlice } from '@/redux/slices/cartSlice/cartSlice';
import { loginSlice } from '@/redux/slices/loginSlice/loginSlice';
import { snackbarSlice } from '@/redux/slices/snackbarSlice/snackbarSlice';

const FormContainer = ({
  childComponent,
  data,
  title,
  path,
  pathName,
  page,
}: {
  childComponent: (
    data1: Record<string, FormItemFieldsParams[]>,
    formik1: FormikProps<formikValuesType>,
    open: Record<string, string | boolean>
  ) => React.JSX.Element;
  data: Record<string, FormItemFieldsParams[]>;
  title: string;
  path: string;
  pathName: string;
  page: Pages;
}) => {
  const validationSchema = object().shape(generateFormikFieldsRules(data));
  const initialValues: Record<string, string | boolean> = generateInitialFormikValue(data);
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState({ name: '', state: false });
  const [isValid, setIsValid] = useState(false);
  const matches = useMediaQuery('(max-width:650px)');
  const login = async (values: formikValuesType, token: string) => {
    if (token) {
      const loginPayload = deletePrefixKey(values);
      const { email, password } = loginPayload;
      const response = await dispatch(loginAsync({ loginPayload, token }));
      if (response.payload.cart) {
        dispatch(cartSlice.actions.setCart(response.payload.cart));
      }
      if (response.payload.customer) {
        dispatch(loginSlice.actions.setCustomer(response.payload.customer));
      }
      if (response.payload) {
        router.push('/', { scroll: false });
        const loginCredentials = {
          username: email as string,
          password: password as string,
        };

        dispatch(getCustomerAccessTokenAsync(loginCredentials));
      }
    }
  };

  const signUp = async (values: formikValuesType, token: string) => {
    if (token) {
      const structuredValues = structureInputValues(values);
      const signUpPayload = createCustomerDraft(structuredValues);
      const loginPayload = {
        email: structuredValues[FormGroups.CUSTOMER]?.email ? structuredValues[FormGroups.CUSTOMER].email : '',
        password: structuredValues[FormGroups.CUSTOMER]?.password ? structuredValues[FormGroups.CUSTOMER].password : '',
      };
      const response = await dispatch(signUpAsync({ signUpPayload, token }));
      if (response.payload?.cart) {
        dispatch(cartSlice.actions.setCart(response.payload.cart));
      }
      if (response.payload?.customer) {
        await dispatch(loginSlice.actions.setCustomer(response.payload.customer));
        dispatch(
          snackbarSlice.actions.setMessage({
            message: "You've successfully registered and logged in",
            variant: 'success',
          })
        );
      }

      if (response.payload) {
        dispatch(
          getCustomerAccessTokenAsync({
            username: loginPayload.email as string,
            password: loginPayload.password as string,
          })
        );
        router.push('/', { scroll: false });
      }
    }
  };

  const formikConfig: FormikConfig<formikValuesType> = {
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async values => {
      const token = TokenService.getAccessToken();
      if (page === Pages.LOGIN && token) {
        await login(values, token);
      } else if (token) {
        await signUp(values, token);
      }
    },
  };

  const currentPath = usePathname();

  useEffect(() => {
    const isLogin = TokenService.getAccessTokenFromLS()?.type === TokenType.CUSTOMER;
    if (isLogin && (currentPath === '/login' || currentPath === '/signup')) router.push('/');
  }, [currentPath, router]);

  const formik: FormikProps<formikValuesType> = useFormik(formikConfig);

  const updateTouchedStateForFieldGroup = (excludeGroups: string[]) => {
    const touchedFields: Record<string, boolean> = {};

    Object.keys(formik.values).forEach(field => {
      const fieldGroup = field.split('-')[0];

      if (!excludeGroups.includes(fieldGroup)) {
        touchedFields[field] = false;
      }
    });

    formik.setTouched(touchedFields);
  };

  const openNextAccSection = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      const errors = await formik.validateForm();
      const customerErrorsArray = Object.keys(errors)
        .filter(key => key.includes('customer'))
        .map(key => ({ [key]: errors[key] }));
      if (customerErrorsArray.length === 0) {
        updateTouchedStateForFieldGroup([FormGroups.CUSTOMER]);
        setOpen({ name: 'panel2', state: true });
        if (matches) {
          const shippingErrorsArray = Object.keys(errors)
            .filter(key => key.includes('shipping'))
            .map(key => ({ [key]: errors[key] }));
          if (shippingErrorsArray.length === 0) {
            updateTouchedStateForFieldGroup([FormGroups.CUSTOMER, FormGroups.SHIPPING_ADDRESS]);
            setOpen({ name: 'panel3', state: true });
            setIsValid(true);
          }
        } else {
          setIsValid(true);
        }
      } else {
        formik.handleSubmit();
      }
    },
    [formik]
  );

  return (
    <div className='form-container__background-img'>
      <div className='background-img background-img_left'>
        <Image src={LeafLeft} alt='leaf' quality={75} />
      </div>
      <div className='background-img background-img_right'>
        <Image src={LeafRight} alt='leaf' quality={75} priority={true} />
      </div>
      <Paper elevation={3} className='form__paper'>
        <div className='form__links'>
          <Link href='/'>Home</Link>
          <Link href={path}>{pathName}</Link>
        </div>
        <Image src={Leaf} alt='leaf' className='form-img' quality={75} />
        <Image src={LeafSmall} alt='leaf' className='form-img-bottom' quality={75} />
        <form className='form' onSubmit={formik.handleSubmit}>
          <h2>{title}</h2>
          {childComponent(data, formik, open)}
          {page === Pages.SIGNUP ? (
            !isValid ? (
              <FsButton className={FsButtonType.REGULAR} type='submit' label='Next' onClick={openNextAccSection} />
            ) : (
              <FsButton type='submit' className={FsButtonType.REGULAR} label='SEND' />
            )
          ) : (
            <FsButton type='submit' className={FsButtonType.REGULAR} label='SEND' />
          )}
        </form>
      </Paper>
    </div>
  );
};
export default FormContainer;
