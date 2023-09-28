'use client';
import FormContainer from '@/components/form/FormContainer';
import LoginForm from '@/components/form/login/LoginForm';
import { FormGroups, Pages, ValidationRuleGroup } from '@/types/enums';
import { FormItemFieldsParams } from '@/types/types';

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
      title='Sign in'
      childComponent={LoginForm}
      page={Pages.LOGIN}
      data={{ [FormGroups.LOGIN]: userLoginFields }}
    />
  );
};

export default Login;
