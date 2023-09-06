import { ProductState, ProductVariant } from '@/redux/slices/productSlice/productSlice';

export const createProductVariantsArray = (productData: ProductState) => {
  let variants: { size: string; variant: ProductVariant }[] = [];
  if (productData.masterVariant && productData.masterVariant.attributes.length) {
    variants.push({
      size: productData.masterVariant.attributes.find(attr => attr.name === 'size')?.value || '0',
      variant: productData.masterVariant,
    });
  }
  if (productData.variants.length)
    productData.variants.forEach((variant: ProductVariant) =>
      variants.push({
        size: variant.attributes.find(attr => attr.name === 'size')?.value || '0',
        variant: variant,
      })
    );
  variants.sort((a, b) => +a.size - +b.size);
  return variants;
};
