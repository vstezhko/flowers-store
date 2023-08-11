'use client';
import FormContainer, { FormItemFieldsParams } from '@/components/form/FormContainer';
import LoginForm from '@/components/form/login/LoginForm';
import { FormGroups, ValidationRuleGroup } from '@/types/enums';

const userLoginFields: FormItemFieldsParams[] = [
  {
    id: 1,
    formGroup: FormGroups.LOGIN,
    validationRuleGroup: ValidationRuleGroup.EMAIL,
    name: 'email',
    type: 'text',
    label: 'email',
    value: '',
  },
  {
    id: 2,
    formGroup: FormGroups.LOGIN,
    validationRuleGroup: ValidationRuleGroup.PASSWORD,
    name: 'password',
    type: 'password',
    label: 'password',
    value: '',
  },
];
const Login = () => {
  return (
    <FormContainer
      pathName='Sign Up'
      path='/signup'
      title='Login'
      childComponent={LoginForm}
      data={{ [FormGroups.LOGIN]: userLoginFields }}
    />
  );
};

export default Login;
