import { SvgIcon } from '@mui/material';

const AddIcon = (props: object) => (
  <SvgIcon {...props} sx={{ width: '20px', height: '20px' }} viewBox='0 0 32 32'>
    <path d='m16 2a14 14 0 1 0 14 14 14 14 0 0 0 -14-14zm6 15h-5v5h-2v-5h-5v-2h5v-5h2v5h5z' fill='#6AAE55'></path>
  </SvgIcon>
);

export default AddIcon;
