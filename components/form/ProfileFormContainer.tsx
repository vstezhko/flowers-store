import React from 'react';

import { FormItemFieldsParams } from '@/components/form/FormContainer';

const ProfileFormContainer = ({
  childComponent,
  data,
}: {
  childComponent: (data: Record<string, FormItemFieldsParams[]>) => React.JSX.Element;
  data: Record<string, FormItemFieldsParams[]>;
}) => {
  return <div className='profile__container'>{childComponent(data)}</div>;
};

export default ProfileFormContainer;
