import FsInput from '@/components/UI/FsInput';
import FsPhoneInput from '@/components/UI/FsPhoneInput';
import FsCheckbox from '@/components/UI/FsCheckbox';
import { FormItemFieldsParams } from '@/components/form/FormContainer';

const AddressPanel = ({ data, title }: { data: FormItemFieldsParams[]; title: string }) => {
  return (
    <>
      <h5>{title}</h5>
      {data.map((input: FormItemFieldsParams) =>
        'type' in input && input.type ? (
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
            {'data' in input &&
              input.data &&
              input.data.map(subInput => {
                const { id, ...rest } = subInput;
                return <FsInput id={subInput.id.toString()} key={subInput.id} {...rest} />;
              })}
          </div>
        )
      )}
      <FsCheckbox label='set as default billing address' />
    </>
  );
};

export default AddressPanel;
