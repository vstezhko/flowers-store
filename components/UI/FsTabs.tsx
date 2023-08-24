import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { FormItemFieldsParams } from '@/types/types';
import PersonalInfoForm from '@/components/form/personalForm/PersonalInfoForm';

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

export default function FsTabs({ tabs, customer }: { tabs: string[]; customer: FormItemFieldsParams[] }) {
  const [tabValue, setTabValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newTab: number) => {
    setTabValue(newTab);
  };

  console.log(customer);

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
    </div>
  );
}
