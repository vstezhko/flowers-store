import React, { useEffect, useState } from 'react';
import { Customer, ICustomerAddress } from '@/redux/slices/loginSlice/loginSlice';
import { Button, Card, CardContent } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FsModal from '@/components/UI/FsModal';
import AddIcon from '@/components/Icons/AddIcon';
import PersonalForm from '@/components/form/personalForm/PersonalForm';
import PersonalAddressForm from '@/components/form/personalForm/PersonalAddressForm';
import { ValidationRuleGroup } from '@/types/enums';
import { FormItemFieldsParams } from '@/types/types';

const ProfileAddressCard = ({
  addressData,
  type,
  customer,
}: {
  addressData: ICustomerAddress[];
  type: string;
  customer: Customer;
}) => {
  const [open, setOpen] = useState(false);
  const [typeForm, setTypeForm] = useState('');
  const [editingAddress, setEditingAddress] = useState<ICustomerAddress | null>(null);
  const [currentAddress, setCurrentAddress] = useState<FormItemFieldsParams[]>([]);
  const handleOpen = (nameForm: string, address: ICustomerAddress | null) => {
    setOpen(true);
    setTypeForm(nameForm);
    setEditingAddress(address);
  };

  const handleClose = () => {
    setOpen(false);
    setTypeForm('');
  };

  const generateAddresses = (group: string, address: ICustomerAddress | null) => {
    return [
      {
        id: 1,
        formGroup: group,
        validationRuleGroup: ValidationRuleGroup.PHONE,
        name: 'phone',
        type: 'phone',
        label: 'phone',
        value: address?.phone || '',
      },
      {
        id: 2,
        formGroup: group,
        validationRuleGroup: ValidationRuleGroup.COMMON,
        name: 'country',
        type: 'select',
        label: 'country',
        value: address?.country || '',
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
        value: address?.city || '',
      },
      {
        id: 4,
        name: 'streetName',
        formGroup: group,
        validationRuleGroup: ValidationRuleGroup.COMMON,
        type: 'text',
        label: 'street',
        value: address?.streetName || '',
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
            value: address?.building || '',
          },
          {
            id: 14,
            formGroup: group,
            validationRuleGroup: ValidationRuleGroup.COMMON,
            name: 'apartment',
            type: 'text',
            label: 'apt.',
            value: address?.apartment || '',
          },
          {
            id: 15,
            formGroup: group,
            validationRuleGroup: ValidationRuleGroup.POSTAL_CODE_SHIPPING,
            name: 'postalCode',
            type: 'text',
            label: 'zip code',
            value: address?.postalCode || '',
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
        value: address ? !!customer?.defaultShippingAddressId : false,
      },
    ];
  };

  useEffect(() => {
    if (editingAddress) {
      setCurrentAddress(generateAddresses(type, editingAddress));
    }
  }, [type, editingAddress]);

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
          <PersonalForm
            data={currentAddress}
            type={type}
            modeEdit={false}
            childComponent={PersonalAddressForm}
            typeForm={typeForm}
          />
        </FsModal>
      )}
      {typeForm === 'edit' && (
        <FsModal open={open} handleClose={handleClose}>
          <PersonalForm
            data={currentAddress}
            type={type}
            modeEdit={true}
            childComponent={PersonalAddressForm}
            typeForm={typeForm}
          />
        </FsModal>
      )}
    </>
  );
};

export default ProfileAddressCard;