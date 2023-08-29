import { FormGroups, ValidationRuleGroup } from '@/types/enums';
import { FormItemFieldsParams } from '@/types/types';

export interface IconParams {
  disabled?: boolean;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface IAddress {
  phone: string;
  country: string;
  city: string;
  streetName: string;
  building: string;
  apartment: string;
  postalCode: string;
}

export interface customerDraft {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  addresses: IAddress[];
  shippingAddresses: number[];
  defaultShippingAddress?: number | null;
  billingAddresses: number[];
  defaultBillingAddress?: number | null;
}

export interface selectInputOptions {
  code: string;
  name: string;
}

export interface FormItemFieldParams {
  id: number;
  formGroup: FormGroups;
  validationRuleGroup: ValidationRuleGroup;
  name: string;
  type?: string;
  label?: string;
  value?: string | null;
  options?: selectInputOptions[];
}

export interface FormItemUnionFieldsParams {
  id: number | string;
  data?: FormItemFieldsParams[];
}

export interface ChangeAddressAction {
  action: 'changeAddress';
  addressId: string;
  address: IAddress;
}

export interface SetDefaultAddressAction {
  action: 'setDefaultShippingAddress' | 'setDefaultBillingAddress';
  addressId: string;
}

export interface ChangeEmailAction {
  action: 'changeEmail';
  email: string;
}

export interface SetFirstNameAction {
  action: 'setFirstName';
  firstName: string;
}

export interface SetLastNameAction {
  action: 'setLastName';
  lastName: string;
}

export interface SetDateOfBirthAction {
  action: 'setDateOfBirth';
  dateOfBirth: string;
}
