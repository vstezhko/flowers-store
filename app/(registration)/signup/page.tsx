'use client';
import FormContainer from '@/components/form/FormContainer';
import { Pages } from '@/types/enums';
import signUpForm from '@/components/form/signup/SignUpForm';
import { authData } from '@/data/authData';

const SignUp = () => {
  return (
    <FormContainer
      childComponent={signUpForm}
      data={authData}
      pathName='Sign in'
      path='/login'
      page={Pages.SIGNUP}
      title='Sign up'
    />
  );
};

export default SignUp;
