import { FormGroups, ValidationRuleGroup } from '@/types/enums';
import { FormItemFieldsParams } from '@/components/form/FormContainer';
import { string, StringSchema } from 'yup';

const RulesForFields = {
  [ValidationRuleGroup.COMMON]: string().min(2, 'min').required('Required'),
  [ValidationRuleGroup.EMAIL]: string().min(2, 'min').required('Required'),
  [ValidationRuleGroup.PASSWORD]: string().min(2, 'min').required('Required'),
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
        acc[item.formGroup] = {};
      }
      // @ts-ignore
      acc[item.formGroup][item.name] = RulesForFields[item.validationRuleGroup];
    }

    if ('data' in item && item.data) {
      generateFormikFieldsRules(item.data, acc);
    }

    return acc;
  }, initialValue);
};
