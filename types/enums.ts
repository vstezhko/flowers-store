export enum FsButtonType {
  ICON = 'icon',
  BIG = 'big',
  MEDIUM = 'medium',
  REGULAR = 'regular',
  SMALL = 'small',
}

export enum FormGroups {
  CUSTOMER = 'customer',
  SHIPPING_ADDRESS = 'shippingAddress',
  BILLING_ADDRESS = 'billingAddress',
  LOGIN = 'login',
}

export enum Pages {
  LOGIN = 'login',
  SIGNUP = 'signup',
}

export enum ValidationRuleGroup {
  EMAIL = 'email',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirmPassword',
  COMMON = 'common',
  PHONE = 'phone',
  NAME = 'name',
  POSTAL_CODE_SHIPPING = 'shippingPostalCode',
  POSTAL_CODE_BILLING = 'billingPostalCode',
  NOVALIDATE = 'novalidate',
  BIRTHDAY = 'birthday',
}

export enum TokenType {
  CLIENT = 'client',
  ANONYMOUS = 'anonymous',
  CUSTOMER = 'customer',
}

export enum SortNames {
  NO_SORT = 'No sort',
  NAME_ASC = 'Name (A-Z)',
  NAME_DESC = 'Name (Z-A)',
  PRICE_ASC = 'Price (low to high)',
  PRICE_DESC = 'Price (high to low)',
}

export enum SortParams {
  PRICE = 'price',
  NAME = 'name.en',
  ASC = 'asc',
  DESC = 'desc',
}
