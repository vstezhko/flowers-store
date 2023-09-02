import { FormGroups, ValidationRuleGroup } from '@/types/enums';
import { ref, string, StringSchema } from 'yup';
import { FormItemFieldsParams } from '@/types/types';

const getZipValidation = (mainField: string): StringSchema => {
  return string()
    .required('req.')
    .when(mainField, {
      is: 'DE',
      then: schema => schema.matches(/^\d{5}$/, 'invalid'),
    })
    .when(mainField, {
      is: 'PL',
      then: schema => schema.matches(/^\d{2}-\d{3}$/, 'invalid'),
    })
    .when(mainField, {
      is: 'FX',
      then: schema => schema.matches(/^\d{2}[ ]?\d{3}$/, 'invalid'),
    });
};

const RulesForFields = {
  [ValidationRuleGroup.BIRTHDAY]: string()
    .required('req.')
    .test('at-least-13-years', 'at least 13 years old', value => {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      const ageDiff = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return ageDiff - 1 >= 13;
      }
      return ageDiff >= 13;
    }),
  [ValidationRuleGroup.COMMON]: string().required('req.').max(25, 'too long'),
  [ValidationRuleGroup.EMAIL]: string()
    .required('req.')
    .max(25, 'too long')
    .test('no-leading-trailing-space', 'no leading/trailing spaces', value => {
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
    .required('req.')
    .max(25, 'too long')
    .test('no-leading-trailing-space', 'no leading/trailing spaces', value => {
      if (!value) return true;
      return !/^\s|\s$/.test(value);
    })
    .min(8, 'min 8 characters')
    .matches(/^(?=.*\d)/, 'need 1 digit')
    .matches(/(?=.*[A-Z])/, 'need 1 uppercase (A-Z)')
    .matches(/(?=.*[a-z])/, 'need 1 lowercase (a-z)')
    .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, 'need 1 special symbol'),
  [ValidationRuleGroup.CONFIRM_PASSWORD]: string()
    .required('retype your password.')
    .oneOf([ref(`${FormGroups.CUSTOMER}-${ValidationRuleGroup.PASSWORD}`)], 'passwords mismatch'),
  [ValidationRuleGroup.PHONE]: string()
    .required('req.')
    .max(15, 'too long')
    .min(15, 'too short')
    .matches(/^[\d+ ]*$/, 'invalid phone number'),
  [ValidationRuleGroup.NAME]: string()
    .required('req.')
    .max(25, 'too long')
    .matches(/^[^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, 'no special characters')
    .matches(/^[^0-9]*$/, 'no numbers'),
  [ValidationRuleGroup.POSTAL_CODE_SHIPPING]: getZipValidation(`${FormGroups.SHIPPING_ADDRESS}-country`),
  [ValidationRuleGroup.POSTAL_CODE_BILLING]: getZipValidation(`${FormGroups.BILLING_ADDRESS}-country`),
};
export const generateFormikFieldsRules = (
  inputs: Record<FormGroups, FormItemFieldsParams[]> | FormItemFieldsParams[],
  initialValue: Record<string, StringSchema> = {}
) => {
  const inputsArray = !Array.isArray(inputs) ? [...Object.values(inputs).flatMap(arr => arr)] : inputs;

  return inputsArray.reduce((acc, item) => {
    if ('name' in item && item.name && item.validationRuleGroup !== ValidationRuleGroup.NOVALIDATE) {
      acc[`${item.formGroup}-${item.name}`] = RulesForFields[item.validationRuleGroup] as StringSchema;
    }

    if ('data' in item && item.data) {
      generateFormikFieldsRules(item.data, acc);
    }

    return acc;
  }, initialValue);
};
