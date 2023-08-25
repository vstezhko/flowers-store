import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { FormItemFieldsParams } from '@/types/types';
import PersonalInfoForm from '@/components/form/personalForm/PersonalInfoForm';
import PersonalAddressForm from '@/components/form/personalForm/PersonalAddressForm';
import { FormGroups } from '@/types/enums';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      className='tab__panel'
      {...other}>
      {value === index && <div className='tab__panel-container'>{children}</div>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function FsTabs({
  tabs,
  customer,
  shippingAddress,
  billingAddress,
}: {
  tabs: string[];
  customer: FormItemFieldsParams[];
  shippingAddress: FormItemFieldsParams[];
  billingAddress: FormItemFieldsParams[];
}) {
  const [tabValue, setTabValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newTab: number) => {
    setTabValue(newTab);
  };

  console.log(shippingAddress);

  return (
    <div className='tabs'>
      <Tabs orientation='vertical' value={tabValue} sx={{ marginRight: '20px' }} onChange={handleChange}>
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab} {...a11yProps(index)} />
        ))}
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <PersonalInfoForm customer={customer} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <PersonalAddressForm address={shippingAddress} type={FormGroups.SHIPPING_ADDRESS} />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <PersonalAddressForm address={billingAddress} type={FormGroups.BILLING_ADDRESS} />
      </TabPanel>
    </div>
  );
}
