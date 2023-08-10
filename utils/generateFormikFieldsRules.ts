import { FormGroups, ValidationRuleGroup } from '@/types/enums';
import { FormItemFieldsParams } from '@/components/form/FormContainer';
import { object, string, StringSchema } from 'yup';

const RulesForFields = {
  [ValidationRuleGroup.COMMON]: string().max(40, 'Too Long!').required('Required'),
  [ValidationRuleGroup.EMAIL]: string().trim().email('Invalid email').required('Email is required'),
  [ValidationRuleGroup.PASSWORD]: string()
    .trim()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one digit')
    .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
    .required('Password is required'),
};

export const generateFormikFieldsRules = (
  inputs: Record<FormGroups, FormItemFieldsParams[]> | FormItemFieldsParams[],
  initialValue: Record<string, StringSchema> = {}
) => {
  const inputsArray = !Array.isArray(inputs) ? [...Object.values(inputs).flatMap(arr => arr)] : inputs;

  return inputsArray.reduce((acc, item) => {
    if ('name' in item && item.name) {
      if (!acc[item.formGroup]) {
        // @ts-ignore
        acc[item.formGroup] = object({});
      }
      console.log(acc.fields);
      // @ts-ignore
      acc[item.formGroup][item.name] = RulesForFields[item.validationRuleGroup];
    }

    if ('data' in item && item.data) {
      generateFormikFieldsRules(item.data, acc);
    }

    return acc;
  }, initialValue);
};
