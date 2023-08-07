import React, { Ref } from 'react';
import { forwardRef } from 'react';
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import { InputMask } from '@react-input/mask';
import FsInput, { FsInputParams } from '@/components/FsInput';

type CustomInputProps = {
  label?: string;
};

// @ts-ignore
// eslint-disable-next-line react/display-name
const CustomInput = forwardRef((props, forwardedRef) => {
  return <FsInput {...props} forwardedRef={forwardedRef as Ref<HTMLInputElement>} />;
});

const FsPhoneInput = (props: FsInputParams) => {
  return (
    <InputMask<CustomInputProps>
      component={CustomInput}
      showMask={true}
      mask='+48 ___ ___ ___'
      replacement={{ _: /\d/ }}
      {...props}
    />
  );
};

export default FsPhoneInput;
