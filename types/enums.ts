export enum FsButtonType {
  ICON = 'icon',
  BIG = 'big',
  MEDIUM = 'medium',
  REGULAR = 'regular',
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
}

export enum TokenType {
  CLIENT = 'client',
  ANONYMOUS = 'anonymous',
  CUSTOMER = 'customer',
}
