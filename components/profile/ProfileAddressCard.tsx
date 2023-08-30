import React from 'react';
import { Customer, ICustomerAddress } from '@/redux/slices/loginSlice/loginSlice';
import { Button, Card, CardContent } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FsModal from '@/components/UI/FsModal';
import AddIcon from '@/components/Icons/AddIcon';
import PersonalForm from '@/components/form/personalForm/PersonalForm';
import PersonalAddressForm from '@/components/form/personalForm/PersonalAddressForm';
import { ValidationRuleGroup } from '@/types/enums';

const ProfileAddressCard = ({
  addressData,
  type,
  customer,
}: {
  addressData: ICustomerAddress[];
  type: string;
  customer: Customer;
}) => {
  const [open, setOpen] = React.useState(false);
  const [typeForm, setTypeForm] = React.useState('');
  const [editingAddress, setEditingAddress] = React.useState<ICustomerAddress | null>(null);
  const handleOpen = (nameForm: string, address: ICustomerAddress | null) => {
    setOpen(true);
    setTypeForm(nameForm);
    setEditingAddress(address);
  };

  const handleClose = () => {
    setOpen(false);
    setTypeForm('');
  };

  const generateAddresses = (group: string, currentAddress: ICustomerAddress | null) => {
    return [
      {
        id: 1,
        formGroup: group,
        validationRuleGroup: ValidationRuleGroup.PHONE,
        name: 'phone',
        type: 'phone',
        label: 'phone',
        value: currentAddress?.phone || '',
      },
      {
        id: 2,
        formGroup: group,
        validationRuleGroup: ValidationRuleGroup.COMMON,
        name: 'country',
        type: 'select',
        label: 'country',
        value: currentAddress?.country || '',
        options: [
          { code: 'PL', name: 'Poland' },
          { code: 'DE', name: 'Germany' },
          { code: 'FX', name: 'France' },
        ],
      },
      {
        id: 3,
        formGroup: group,
        validationRuleGroup: ValidationRuleGroup.NAME,
        name: 'city',
        type: 'text',
        label: 'city',
        value: currentAddress?.city || '',
      },
      {
        id: 4,
        name: 'streetName',
        formGroup: group,
        validationRuleGroup: ValidationRuleGroup.COMMON,
        type: 'text',
        label: 'street',
        value: currentAddress?.streetName || '',
      },
      {
        id: 5,
        data: [
          {
            id: 13,
            formGroup: group,
            validationRuleGroup: ValidationRuleGroup.COMMON,
            name: 'building',
            type: 'text',
            label: 'building',
            value: currentAddress?.building || '',
          },
          {
            id: 14,
            formGroup: group,
            validationRuleGroup: ValidationRuleGroup.COMMON,
            name: 'apartment',
            type: 'text',
            label: 'apt.',
            value: currentAddress?.apartment || '',
          },
          {
            id: 15,
            formGroup: group,
            validationRuleGroup: ValidationRuleGroup.POSTAL_CODE_SHIPPING,
            name: 'postalCode',
            type: 'text',
            label: 'zip code',
            value: currentAddress?.postalCode || '',
          },
        ],
      },
      {
        id: 6,
        name: 'default',
        formGroup: group,
        validationRuleGroup: ValidationRuleGroup.NOVALIDATE,
        type: 'checkbox',
        label: 'default shipping address',
        value: currentAddress ? !!customer?.defaultShippingAddressId : false,
      },
    ];
  };

  const currentAddress = generateAddresses(type, editingAddress);

  return (
    <>
      <div className='form__content form__content_address'>
        <IconButton aria-label='edit' onClick={() => handleOpen('add', null)} className='add-icon'>
          <AddIcon />
        </IconButton>
        {addressData.map(i => (
          <Card key={i.id} className='card-address'>
            <CardContent>
              <div>
                {i.country}, {i.city}
              </div>
              <div>
                {i.streetName}, {i.building}/{i.apartment}
              </div>
              <div>{i.postalCode}</div>
              <div>{i.phone}</div>
            </CardContent>
            <CardActions>
              <Button className='card-btn' onClick={() => handleOpen('edit', i)}>
                Edit
              </Button>
              <Button className='card-btn'>Delete</Button>
            </CardActions>
          </Card>
        ))}
      </div>
      {typeForm === 'add' && (
        <FsModal open={open} handleClose={handleClose}>
          <div className='modal'>
            <PersonalForm data={currentAddress} type={type} modeEdit={false} childComponent={PersonalAddressForm} />
          </div>
        </FsModal>
      )}
      {typeForm === 'edit' && (
        <FsModal open={open} handleClose={handleClose}>
          <div className='modal'>
            <PersonalForm data={currentAddress} type={type} modeEdit={true} childComponent={PersonalAddressForm} />
          </div>
        </FsModal>
      )}
    </>
  );
};

export default ProfileAddressCard;
