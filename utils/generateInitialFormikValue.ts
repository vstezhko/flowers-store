import { FormGroups } from '@/types/enums';
import { FormItemFieldsParams } from '@/types/types';

export const generateInitialFormikValue = (
  inputs: Record<FormGroups, FormItemFieldsParams[]> | FormItemFieldsParams[],
  initialValue: Record<string, string | boolean> = {}
): Record<string, string | boolean> => {
  const inputsArray = !Array.isArray(inputs) ? [...Object.values(inputs).flatMap(arr => arr)] : inputs;

  return inputsArray.reduce((acc, item) => {
    if ('name' in item && item.name) {
      if (item.type === 'checkbox') {
        acc[`${item.formGroup}-${item.name}`] = false;
      } else {
        acc[`${item.formGroup}-${item.name}`] = '';
      }
    }

    if ('data' in item && item.data) {
      generateInitialFormikValue(item.data, acc);
    }
    return acc;
  }, initialValue);
};
