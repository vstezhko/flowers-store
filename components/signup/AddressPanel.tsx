import FsInput from '@/components/UI/FsInput';
import FsPhoneInput from '@/components/UI/FsPhoneInput';
import FsCheckbox from '@/components/UI/FsCheckbox';
import { FormItemFieldsParams } from '@/components/form/signup/SignUpForm';

const AddressPanel = ({ address, title }: { address: FormItemFieldsParams[]; title: string }) => {
  return (
    <>
      <h5>{title}</h5>
      {address.map((input: FormItemFieldsParams) =>
        input.type ? (
          input.type !== 'phone' ? (
            <FsInput id={input.id.toString()} key={input.id} label={input.label} type={input.type} name={input.name} />
          ) : (
            <FsPhoneInput
              id={input.id.toString()}
              key={input.id}
              label={input.label}
              type={input.type}
              name={input.name}
            />
          )
        ) : (
          <div className='input__container' key={input.id}>
            {input.data &&
              input.data.map(subInput => (
                <FsInput
                  id={subInput.id.toString()}
                  key={subInput.id}
                  label={subInput.label}
                  type={subInput.type}
                  name={subInput.name}
                />
              ))}
          </div>
        )
      )}
      <FsCheckbox label='set as default billing address' />
    </>
  );
};

export default AddressPanel;
