import { FormGroups, ValidationRuleGroup } from '@/types/enums';
import { FormItemFieldsParams } from '@/components/form/FormContainer';
import { ref, string, StringSchema } from 'yup';

const RulesForFields = {
  [ValidationRuleGroup.COMMON]: string().required('required').max(25, 'too long'),
  [ValidationRuleGroup.EMAIL]: string()
    .required('required')
    .max(25, 'too long')
    .test('no-leading-trailing-space', 'no leading or trailing whitespace', value => {
      if (!value) return true;
      return !/^\s|\s$/.test(value);
    })
    .test('valid-email', 'should contain an "@"', value => {
      if (!value) return true;
      return value.includes('@');
    })
    .test('valid-domain', 'should contain a domain name', value => {
      if (!value) return true;
      const domainRegex = /([\wЁёА-я-]{2,})\.([\wЁёА-я-]{2,})/;
      return domainRegex.test(value);
    })
    .email('enter a valid email'),
  [ValidationRuleGroup.PASSWORD]: string()
    .required('required')
    .max(25, 'too long')
    .min(8, 'min 8 characters.')
    .matches(/^(?=.*\d)/, 'need at least 1 digit')
    .matches(/(?=.*[A-Z])/, 'need 1 uppercase character')
    .matches(/(?=.*[a-z])/, 'need 1 lowercase character')
    .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, 'need at least 1 special symbol'),
  [ValidationRuleGroup.CONFIRM_PASSWORD]: string()
    .required('retype your password.')
    .oneOf([ref(`${FormGroups.CUSTOMER}-${ValidationRuleGroup.PASSWORD}`)], 'passwords mismatch'),
  [ValidationRuleGroup.PHONE]: string()
    .required('required')
    .max(25, 'too long')
    .matches(/^[^_]*$/, 'invalid phone number.'),
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
