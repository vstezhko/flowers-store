import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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

interface FsTabsProps {
  tabs: string[];
  components: React.JSX.Element[];
}

export default function FsTabs({ tabs, components }: FsTabsProps) {
  const [tabValue, setTabValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newTab: number) => {
    setTabValue(newTab);
  };

  return (
    <div className='tabs'>
      <Tabs orientation='vertical' value={tabValue} sx={{ marginRight: '20px' }} onChange={handleChange}>
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab} {...a11yProps(index)} />
        ))}
      </Tabs>
      {components?.map((component: React.JSX.Element, index: number) => (
        <TabPanel key={index} value={tabValue} index={index}>
          {component}
        </TabPanel>
      ))}
    </div>
  );
}
