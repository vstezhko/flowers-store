import { ICustomerAddress } from '@/redux/slices/loginSlice/loginSlice';
import { FormGroups, ValidationRuleGroup } from '@/types/enums';

export const generateAddresses = (group: string, address: ICustomerAddress | null, defaultAddress: boolean) => {
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
          validationRuleGroup:
            group === FormGroups.SHIPPING_ADDRESS
              ? ValidationRuleGroup.POSTAL_CODE_SHIPPING
              : ValidationRuleGroup.POSTAL_CODE_BILLING,
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
      label: group === FormGroups.SHIPPING_ADDRESS ? 'default shipping address' : 'default billing address',
      value: defaultAddress,
    },
  ];
};
