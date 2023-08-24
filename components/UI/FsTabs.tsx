import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { FormGroups } from '@/types/enums';
import { FormItemFieldsParams } from '@/components/form/FormContainer';
import { useMediaQuery } from '@mui/material';

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
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function FsTabs({ tabs, data }: { tabs: string[]; data: Record<FormGroups, FormItemFieldsParams[]> }) {
  const [value, setValue] = React.useState(0);
  console.log(data);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const matches = useMediaQuery('(max-width:768px)');

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#EBF0E3', display: 'flex', borderRadius: '8px' }}>
      <Tabs
        orientation={matches ? 'horizontal' : 'vertical'}
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: 'divider' }}>
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab} {...a11yProps(index)} />
        ))}
      </Tabs>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}
