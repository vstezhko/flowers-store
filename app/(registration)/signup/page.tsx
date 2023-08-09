'use client';
import FormContainer from '@/components/form/FormContainer';
import SignUpForm from '@/components/form/signup/SignUpForm';

const SignUp = () => {
  return (
    <FormContainer pathName='Login' path='/login' title='Sign up'>
      <SignUpForm />
    </FormContainer>
  );
};

export default SignUp;
