export interface IconParams {
  disabled?: boolean;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface address {
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
  addresses: address[];
  shippingAddressIds: number[];
  defaultShippingAddress?: number | null;
  billingAddressIds: number[];
  defaultBillingAddress?: number | null;
}

export interface selectInputOptions {
  code: string;
  name: string;
}
