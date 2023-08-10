import FsInput from '@/components/UI/FsInput';
import FsPhoneInput from '@/components/UI/FsPhoneInput';
import FsCheckbox from '@/components/UI/FsCheckbox';
import { formikValuesType, FormItemFieldsParams } from '@/components/form/FormContainer';
import { FormikProps } from 'formik';
import { FormGroups } from '@/types/enums';

const AddressPanel = ({
  data,
  title,
  formik,
  addressType,
}: {
  data: FormItemFieldsParams[];
  title: string;
  formik: FormikProps<formikValuesType>;
  addressType: FormGroups;
}) => {
  const formikTouched = formik.touched[addressType];
  const formikErrors = formik.errors[addressType];

  return (
    <>
      <h5>{title}</h5>
      {data.map((inputData: FormItemFieldsParams) =>
        'type' in inputData && inputData.type ? (
          inputData.type !== 'phone' ? (
            <FsInput
              id={inputData.id.toString()}
              key={inputData.id}
              label={inputData.label || ''}
              type={inputData.type}
              name={inputData.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[addressType][inputData.name]}
              errorText={
                formikTouched && formikErrors
                  ? formikTouched[inputData.name] && formikErrors[inputData.name]
                    ? formikErrors[inputData.name]
                    : ' '
                  : ' '
              }
              error={
                formikTouched && formikErrors
                  ? formikTouched[inputData.name] && Boolean(formikErrors[inputData.name])
                  : false
              }
              formGroup={inputData.formGroup}
            />
          ) : (
            <FsPhoneInput
              id={inputData.id.toString()}
              key={inputData.id}
              value={formik.values[addressType][inputData.name] || '+48 ___ ___ ___'}
              label={inputData.label || ''}
              type={inputData.type}
              name={inputData.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errorText={
                formikTouched && formikErrors
                  ? formikTouched[inputData.name] && formikErrors[inputData.name]
                    ? formikErrors[inputData.name]
                    : ' '
                  : ' '
              }
              error={
                formikTouched && formikErrors
                  ? formikTouched[inputData.name] && Boolean(formikErrors[inputData.name])
                  : false
              }
              formGroup={inputData.formGroup}
            />
          )
        ) : (
          <div className='input__container' key={inputData.id}>
            {'data' in inputData &&
              inputData.data &&
              inputData.data.map(subInput => {
                if ('value' in subInput) {
                  return (
                    <FsInput
                      id={subInput.id.toString()}
                      key={subInput.id}
                      value={formik.values[addressType][subInput.name] || ''}
                      label={subInput.label || ''}
                      type={subInput.type}
                      name={subInput.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorText={
                        formikTouched && formikErrors
                          ? formikTouched[subInput.name] && formikErrors[subInput.name]
                            ? formikErrors[subInput.name]
                            : ' '
                          : ' '
                      }
                      error={
                        formikTouched && formikErrors
                          ? formikTouched[subInput.name] && Boolean(formikErrors[subInput.name])
                          : false
                      }
                      formGroup={subInput.formGroup}
                    />
                  );
                }
              })}
          </div>
        )
      )}
      <FsCheckbox label='set as default billing address' />
    </>
  );
};

export default AddressPanel;
