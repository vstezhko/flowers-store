import { CurrencyParams } from '@/types/enums';

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
  masterVariantID: number;
}
