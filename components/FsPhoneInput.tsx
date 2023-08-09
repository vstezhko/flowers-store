import React, { Ref } from 'react';
import { forwardRef } from 'react';

// @ts-ignore
import { InputMask } from '@react-input/mask';
import FsInput, { FsInputParams } from '@/components/FsInput';

type CustomInputProps = {
  label?: string;
};

const CustomInput = forwardRef((props: FsInputParams, forwardedRef) => {
  const { id, ...rest } = props;
  return <FsInput {...rest} id={id} forwardedRef={forwardedRef as Ref<HTMLInputElement>} />;
});

CustomInput.displayName = 'CustomInput';

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