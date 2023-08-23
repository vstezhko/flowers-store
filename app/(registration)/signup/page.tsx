'use client';
import FormContainer from '@/components/form/FormContainer';
import { Pages } from '@/types/enums';
import signUpForm from '@/components/form/signup/SignUpForm';
import { data } from '@/data/data';

const SignUp = () => {
  return (
    <FormContainer
      childComponent={signUpForm}
      data={data}
      pathName='Sign in'
      path='/login'
      page={Pages.SIGNUP}
      title='Sign up'
    />
  );
};

export default SignUp;
