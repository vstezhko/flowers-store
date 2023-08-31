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

export type CustomerAddressAction = ChangeAddressAction | SetDefaultAddressAction;

export type CustomerAddAddressAction = AddAddressAction | SetDefaultAddressAction;

export type CustomerAction = ChangeEmailAction | SetFirstNameAction | SetLastNameAction | SetDateOfBirthAction;

export type UpdateCustomerData =
  | CustomerAction[]
  | CustomerAddressAction[]
  | RemoveAddressAction[]
  | CustomerAddAddressAction[]
  | AddAddressIdAction[];
