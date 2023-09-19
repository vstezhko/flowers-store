import React from 'react';
import FsInput from '@/components/UI/FsInput';
import FsButton from '@/components/UI/FsButton';
import { FsButtonType } from '@/types/enums';
import { FormikConfig, FormikProps, useFormik } from 'formik';
import { formikValuesType } from '@/types/types';
import { object, string } from 'yup';
import { addDiscountCodeAsync } from '@/redux/slices/cartSlice/thunk';
import { TokenService } from '@/api/services/Token.service';
import { CartService } from '@/api/services/Cart.services';
import { useDispatch } from '@/redux/store';

const CartDiscountCode = () => {
  const dispatch = useDispatch();

  const addCode = async (value: string) => {
    const token = TokenService.getAccessTokenFromLS()?.token;
    const cart = CartService.getCartFromLS();
    if (token && cart?.id && cart?.version) {
      try {
        await dispatch(
          addDiscountCodeAsync({
            token,
            cartId: cart?.id,
            cartVersion: cart?.version,
            action: 'addDiscountCode',
            code: value,
          })
        ).unwrap();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const formikConfig: FormikConfig<formikValuesType> = {
    initialValues: { coupon: '' },
    validationSchema: object().shape({
      coupon: string().required('req.'),
    }),
    onSubmit: values => {
      const value = values.coupon;
      if (value && typeof value === 'string') addCode(value);
    },
  };

  const formik: FormikProps<formikValuesType> = useFormik(formikConfig);

  return (
    <form
      className='info__coupon'
      onBlur={() => formik.setFieldTouched('coupon', false)}
      onSubmit={formik.handleSubmit}>
      <FsInput
        id='coupon'
        name='coupon'
        type='text'
        label='coupon'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={(formik.values.coupon as string) || ''}
        error={((formik.touched.coupon || formik.values.coupon) && Boolean(formik.errors.coupon)) || false}
        errorText={(formik.touched.coupon || formik.values.coupon) && formik.errors.coupon ? formik.errors.coupon : ''}
      />
      <FsButton type='submit' label='apply' className={FsButtonType.SMALL} variant='outlined' />
    </form>
  );
};

export default CartDiscountCode;
