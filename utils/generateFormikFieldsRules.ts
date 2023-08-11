import { FormGroups, ValidationRuleGroup } from '@/types/enums';
import { FormItemFieldsParams } from '@/components/form/FormContainer';
import { ref, string, StringSchema } from 'yup';

const RulesForFields = {
  [ValidationRuleGroup.COMMON]: string().required('required'),
  [ValidationRuleGroup.EMAIL]: string()
    .test('no-leading-trailing-space', 'should not contain leading or trailing whitespace', value => {
      if (!value) return true;
      return !/^\s|\s$/.test(value);
    })
    .test('valid-email', 'should contain an "@" symbol', value => {
      if (!value) return true;
      return value.includes('@');
    })
    .test('valid-domain', 'should contain a domain name', value => {
      if (!value) return true;
      const domainRegex = /^[^\s@]+\.([^\s@.]+\.)*[^\s@.]+$/;
      return domainRegex.test(value);
    })
    .email('enter a valid email')
    .required('required'),
  [ValidationRuleGroup.PASSWORD]: string()
    .required('required')
    .min(8, 'should be 8 or more characters')
    .matches(/^(?=.*\d)/, 'should contain at least one digit')
    .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, 'should contain at least one uppercase and lowercase character')
    .matches(/\d/, 'should contain at least one number')
    .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, 'should contain at least one special character'),
  [ValidationRuleGroup.CONFIRM_PASSWORD]: string()
    .required('retype your password.')
    .oneOf([ref(`${FormGroups.CUSTOMER}-${ValidationRuleGroup.PASSWORD}`)], 'your passwords do not match.'),
  [ValidationRuleGroup.PHONE]: string()
    .matches(/^[^_]*$/, 'invalid phone number.')
    .required('required'),
};
export const generateFormikFieldsRules = (
  inputs: Record<FormGroups, FormItemFieldsParams[]> | FormItemFieldsParams[],
  initialValue: Record<string, StringSchema> = {}
) => {
  const inputsArray = !Array.isArray(inputs) ? [...Object.values(inputs).flatMap(arr => arr)] : inputs;

  return inputsArray.reduce((acc, item) => {
    if ('name' in item && item.name) {
      acc[`${item.formGroup}-${item.name}`] = RulesForFields[item.validationRuleGroup];
    }

    if ('data' in item && item.data) {
      generateFormikFieldsRules(item.data, acc);
    }

    return acc;
  }, initialValue);
};
