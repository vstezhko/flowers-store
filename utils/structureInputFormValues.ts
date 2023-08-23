import { FormGroups } from '@/types/enums';

export const structureInputValues = (inputObject: Record<string, string | boolean>) => {
  return Object.entries(inputObject).reduce(
    (obj: Record<FormGroups, Record<string, string | boolean>>, [key, value]) => {
      const [inputGroupName, inputFieldName] = key.split('-');

      if (inputGroupName && inputFieldName && Object.values(FormGroups).includes(inputGroupName as FormGroups)) {
        if (!obj[inputGroupName as FormGroups]) {
          obj[inputGroupName as FormGroups] = {};
        }
        obj[inputGroupName as FormGroups][inputFieldName] = value;
      }

      return obj;
    },
    {} as Record<FormGroups, Record<string, string | boolean>>
  );
};
