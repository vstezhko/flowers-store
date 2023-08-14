'use client';

import React, { Ref } from 'react';
import { forwardRef } from 'react';

// @ts-ignore
import { InputMask } from '@react-input/mask';
import FsInput, { FsInputParams } from '@/components/UI/FsInput';

type CustomInputProps = FsInputParams & {
  label?: string;
};

const CustomInput = forwardRef((props: CustomInputProps, forwardedRef: Ref<HTMLInputElement>) => {
  const { id, ...rest } = props;
  return <FsInput {...rest} id={id} forwardedRef={forwardedRef as Ref<HTMLInputElement>} />;
});

CustomInput.displayName = 'CustomInput';

const FsPhoneInput = (props: FsInputParams) => {
  return (
    <InputMask<CustomInputProps>
      {...props}
      component={CustomInput}
      showMask={true}
      mask='+48 ___ ___ ___'
      replacement={{ _: /\d/ }}
      name={`${props.formGroup}-${props.name}`}
    />
  );
};

export default FsPhoneInput;
