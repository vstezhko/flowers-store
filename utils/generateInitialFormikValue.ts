import { FormGroups } from '@/types/enums';
import { FormItemFieldsParams } from '@/components/form/FormContainer';

export const generateInitialFormikValue = (
  inputs: Record<FormGroups, FormItemFieldsParams[]> | FormItemFieldsParams[],
  initialValue: Record<string, string> = {}
): Record<string, string> => {
  const inputsArray = !Array.isArray(inputs) ? [...Object.values(inputs).flatMap(arr => arr)] : inputs;

  return inputsArray.reduce((acc, item) => {
    if ('name' in item && item.name) {
      acc[`${item.formGroup}_${item.name}`] = '';
    }

    if ('data' in item && item.data) {
      generateInitialFormikValue(item.data, acc);
    }
    return acc;
  }, initialValue);
};
