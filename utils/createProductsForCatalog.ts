import noImage from '@/public/img/jpeg/no-image.jpg';
import { PageProduct, ResponseSearchProduct } from '@/app/(main)/catalog/page';

export const createProductsForCatalog = (productsResponse: ResponseSearchProduct[]): PageProduct[] => {
  return productsResponse.map((item: ResponseSearchProduct) => {
    return {
      id: item.id,
      name: item.name.en || '',
      price: item.masterVariant.prices[0].value.centAmount,
      discounted: item.masterVariant.prices[0].discounted?.value.centAmount,
      currency:
        item.masterVariant.prices[0].discounted?.value.currencyCode ?? item.masterVariant.prices[0].value.currencyCode,
      image: item.masterVariant.images[0]?.url ? item.masterVariant.images[0].url : noImage.src,
      description: item.description.en || '',
    };
  });
};
