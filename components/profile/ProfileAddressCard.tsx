import React from 'react';
import { ICustomerAddress } from '@/redux/slices/loginSlice/loginSlice';
import { Card, CardContent } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FsModal from '@/components/UI/FsModal';
import AddIcon from '@/components/Icons/AddIcon';
import { FormItemFieldsParams } from '@/types/types';
import PersonalForm from '@/components/form/personalForm/PersonalForm';
import PersonalAddressForm from '@/components/form/personalForm/PersonalAddressForm';

const ProfileAddressCard = ({
  addressData,
  data,
  type,
}: {
  addressData: ICustomerAddress[];
  data: FormItemFieldsParams[];
  type: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='form__content form__content_address'>
      <IconButton aria-label='edit' onClick={handleOpen} className='add-icon'>
        <AddIcon />
      </IconButton>
      <FsModal open={open} handleClose={handleClose}>
        <PersonalForm data={data} type={type} childComponent={PersonalAddressForm} />
      </FsModal>
      {addressData.map(i => (
        <Card key={i.id} className='card-address'>
          <CardContent>
            <p>{i.country}</p>
            <p>{i.city}</p>
            <p>{i.phone}</p>
            <p>{i.postalCode}</p>
            <p>{i.streetName}</p>
            <p>{i.building}</p>
            <p>{i.apartment}</p>
          </CardContent>
          <CardActions>
            <IconButton aria-label='edit'>
              <EditIcon sx={{ color: '#5B4A58' }} />
            </IconButton>
            <IconButton aria-label='delete'>
              <DeleteOutlineIcon sx={{ color: '#EB5757' }} />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default ProfileAddressCard;
