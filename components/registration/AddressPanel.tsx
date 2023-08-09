import FsInput from '@/components/UI/FsInput';
import FsPhoneInput from '@/components/UI/FsPhoneInput';
import FsCheckbox from '@/components/UI/FsCheckbox';
import { FormItemFieldsParams } from '@/app/(registration)/signup/page';

const AddressPanel = ({ address, title }: { address: FormItemFieldsParams[]; title: string }) => {
  return (
    <>
      <h5>{title}</h5>
      {address.map((input: FormItemFieldsParams) => (
        <>
          {input.type &&
            (input.type !== 'phone' ? (
              <FsInput key={input.id} label={input.label} type={input.type} name={input.name} />
            ) : (
              <FsPhoneInput key={input.id} label={input.label} type={input.type} name={input.name} />
            ))}
          <div className='input__container'>
            {input.data &&
              input.data.map(subInput => (
                <FsInput key={subInput.id} label={subInput.label} type={subInput.type} name={subInput.name} />
              ))}
          </div>
        </>
      ))}
      <FsCheckbox label='set as default billing address' />
    </>
  );
};

export default AddressPanel;
