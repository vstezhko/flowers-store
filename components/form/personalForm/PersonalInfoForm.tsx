import FsInput from '@/components/UI/FsInput';
import * as React from 'react';
import { FormItemFieldsParams } from '@/types/types';

const PersonalInfoForm = (data: FormItemFieldsParams[], checked: boolean) => {
  return (
    <>
      {data?.map(inputData => {
        if ('value' in inputData) {
          const { id, value, name, formGroup, ...rest } = inputData;
          const compoundName = `${formGroup}-${name}`;
          return (
            <FsInput
              {...rest}
              id={inputData.name}
              key={inputData.id}
              name={compoundName}
              value={inputData.value ? inputData.value : undefined}
              onChange={() => console.log('jjj')}
              label={inputData.label || ''}
              formGroup={formGroup}
              disabled={!checked}
            />
          );
        }
      })}
    </>
  );
};
export default PersonalInfoForm;
