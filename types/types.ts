import {
  AddAddressAction,
  AddAddressIdAction,
  ChangeAddressAction,
  ChangeEmailAction,
  FormItemFieldParams,
  FormItemUnionFieldsParams,
  RemoveAddressAction,
  SetDateOfBirthAction,
  SetDefaultAddressAction,
  SetFirstNameAction,
  SetLastNameAction,
} from '@/types/interface';

export type FormItemFieldsParams = FormItemUnionFieldsParams | FormItemFieldParams;

export type formikValuesType = Record<string, string | boolean>;

export type SearchParams = Record<string, string | boolean>;

export type FilterParams = Record<string, string[]>;

export type CustomerAddressAction = ChangeAddressAction | SetDefaultAddressAction;

export type CustomerAddAddressAction = AddAddressIdAction | SetDefaultAddressAction;

export type CustomerAction = ChangeEmailAction | SetFirstNameAction | SetLastNameAction | SetDateOfBirthAction;

export type UpdateCustomerData =
  | CustomerAction[]
  | CustomerAddressAction[]
  | RemoveAddressAction[]
  | CustomerAddAddressAction[]
  | AddAddressAction[];
