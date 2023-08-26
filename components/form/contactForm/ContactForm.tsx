import React, { useEffect } from 'react';
import { FormikConfig, FormikProps, useFormik } from 'formik';
import FsInput from '@/components/UI/FsInput';
import FsButton from '@/components/UI/FsButton';
import { FsButtonType } from '@/types/enums';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { formikValuesType } from '@/types/types';

const ContactForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const SignupSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(70, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  const formikConfig: FormikConfig<formikValuesType> = {
    initialValues: {
      name: '',
      email: '',
      text: '',
    },
    validationSchema: SignupSchema,
    onSubmit: values => {
      enqueueSnackbar(`Thank you, ${values.name}! We have received your message!`, { variant: 'success' });
    },
  };

  const formik: FormikProps<formikValuesType> = useFormik(formikConfig);

  useEffect(() => {
    if (formik.isSubmitting && formik.isValid) formik.resetForm();
  }, [formik, formik.isSubmitting, formik.isValid]);

  return (
    <form className='info__block' onSubmit={formik.handleSubmit}>
      <div className='layout-2-columns'>
        <FsInput
          id='firstName'
          name='name'
          label='firstName'
          value={(formik.values.name as string) || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={(formik.touched.name && Boolean(formik.errors.name)) || false}
          errorText={formik.touched.name && formik.errors.name ? formik.errors.name : ' '}
        />
        <FsInput
          id='email'
          name='email'
          label='email'
          value={(formik.values.email as string) || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={(formik.touched.email && Boolean(formik.errors.email)) || false}
          errorText={formik.touched.email && formik.errors.email ? formik.errors.email : ' '}
        />
      </div>
      <FsInput
        id='text'
        name='text'
        label='text'
        value={(formik.values.text as string) || ''}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className='form__textarea'
        multiline
        maxRows='5'
      />
      <FsButton type='submit' className={FsButtonType.REGULAR} label='Contact' />
    </form>
  );
};

export default ContactForm;
