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
  CURRENT_PASSWORD = 'currentPassword',
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
  NO_SORT = 'NO SORT',
  NAME_ASC = 'NAME (A-Z)',
  NAME_DESC = 'NAME (Z-A)',
  PRICE_ASC = 'PRICE (↓ to ↑)',
  PRICE_DESC = 'PRICE (↑ to ↓)',
}

export enum SortParams {
  PRICE = 'price',
  NAME = 'name.en',
  ASC = 'asc',
  DESC = 'desc',
}

export enum PriceRange {
  MIN = 0,
  MAX = 250,
  STEP = 10,
}

export enum PaginationParams {
  LIMIT = 6,
}

export enum CurrencyParams {
  EUR_TEXT = 'EUR',
  EUR_SYMBOL = '€',
}
