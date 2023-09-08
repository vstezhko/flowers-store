import { CurrencyParams, FormGroups, ValidationRuleGroup } from '@/types/enums';
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

export interface AddAddressAction {
  action: 'addAddress';
  address: IAddress;
}

export interface RemoveAddressAction {
  action: 'removeAddress';
  addressId: string;
}

export interface AddAddressIdAction {
  action: 'addShippingAddressId' | 'addBillingAddressId';
  addressId: string;
}

export interface SetDefaultAddressAction {
  action: 'setDefaultShippingAddress' | 'setDefaultBillingAddress';
  addressId: string | undefined;
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

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
}

export interface ProductCategory {
  typeId: string;
  id: string;
}

export interface ProductPrice {
  id: string;
  discounted: {
    discount: {
      typeId: string;
      id: string;
    };
    value: {
      type: string;
      currencyCode: CurrencyParams.EUR_TEXT;
      centAmount: number;
      fractionDigits: number;
    };
  };
  value: {
    type: string;
    currencyCode: CurrencyParams.EUR_TEXT;
    centAmount: number;
    fractionDigits: number;
  };
}

export interface ProductImage {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
}

export interface Channel {
  isOnStock: boolean;
  availableQuantity: number;
  version: number;
  id: string;
}

export interface ProductVariant {
  id: number;
  sku: string;
  key: string;
  prices: ProductPrice[];
  images: ProductImage[];
  attributes: ProductAttribute[];
  assets: [];
  availability: {
    channels: Record<string, Channel>;
  };
}

export interface ProductAttribute {
  name: string;
  value: string;
}

export interface ResponseSearchProduct {
  id: string;
  name: {
    en: string | null;
  };
  description: {
    en: string | null;
  };
  masterVariant: ProductVariant;
  variants: ProductVariant[];
}

export interface PageProduct {
  id: string;
  name: string;
  price: number;
  discounted: number | undefined;
  currency: string;
  image: string;
  description: string;
}
