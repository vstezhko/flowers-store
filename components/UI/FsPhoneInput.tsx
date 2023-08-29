import { forwardRef } from 'react';

import { InputMask, type InputMaskProps } from '@react-input/mask';
import FsInput, { FsInputParams } from '@/components/UI/FsInput';

const ForwardedInputMask = forwardRef<HTMLInputElement, InputMaskProps>((props, forwardedRef) => {
  return <InputMask ref={forwardedRef} mask='+48 ___ ___ ___' replacement='_' {...props} />;
});

ForwardedInputMask.displayName = 'input';

export default function FsPhoneInput(props: FsInputParams) {
  return <FsInput {...props} inputComponent={ForwardedInputMask} />;
}
