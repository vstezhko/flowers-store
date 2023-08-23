import { FormGroups } from '@/types/enums';
import { FormItemFieldsParams } from '@/components/form/FormContainer';
import FsTabs from '@/components/UI/FsTabs';

const tabsName: string[] = ['Main', 'Shipping Address', 'Billing Address'];
const ProfileComponent = (data: Record<FormGroups, FormItemFieldsParams[]>) => {
  return <FsTabs tabs={tabsName} data={data} />;
};

export default ProfileComponent;
