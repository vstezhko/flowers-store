import { FormItemFieldParams, FormItemUnionFieldsParams } from '@/types/interface';

export type FormItemFieldsParams = FormItemUnionFieldsParams | FormItemFieldParams;

export type formikValuesType = Record<string, string | boolean>;

export type SearchParams = Record<string, string | boolean>;

export type FilterParams = Record<string, string[]>;
