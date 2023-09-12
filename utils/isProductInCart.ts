import { CartItem } from '@/redux/slices/cartSlice/cartSlice';

export const isProductInCart = (
  currentVariantId: number,
  productsIds: Record<string, Record<string, CartItem>>,
  currentProductId: string | number
) => {
  if (currentVariantId && productsIds) {
    if (productsIds[currentProductId]) {
      return !!productsIds[currentProductId][currentVariantId];
    } else return false;
  } else {
    return false;
  }
};
