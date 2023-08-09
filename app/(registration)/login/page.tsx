'use client';
import FormContainer from '@/components/form/FormContainer';
import LoginForm from '@/components/form/login/LoginForm';

const Login = () => {
  return (
    <FormContainer pathName='Sign Up' path='/signup' title='Login'>
      <LoginForm />
    </FormContainer>
  );
};

export default Login;
