import React, { FC, useEffect, useState } from 'react';
import ProductAmountSetter from '@/components/product/ProductAmountSetter';
import ProductSum from '@/components/product/ProductSum';
import { IconButton } from '@mui/material';
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon';
import { ProductPrice, ProductVariant } from '@/redux/slices/productSlice/productSlice';
import ProductVariantCard from '@/components/product/ProductVariantCard';
import Image from 'next/image';
import { useDispatch } from '@/redux/store';
import { LineItem } from '@/api/services/Cart.services';
import { cartInteraction } from '@/utils/cartInteraction';
import { cartSlice } from '@/redux/slices/cartSlice/cartSlice';

export interface CartItemParams {
  name: string;
  productId: string;
  quantity: number;
  price: ProductPrice;
  discountCoupon: number | null;
  variant: ProductVariant;
  lineItemId: string;
}

const CartItem: FC<CartItemParams> = ({ lineItemId, name, quantity, price, discountCoupon, variant }) => {
  const [productAmount, setProductAmount] = useState(quantity || 1);
  const [sum, setSum] = useState(0);
  const [discount] = useState(price.discounted ? price.discounted.value.centAmount / 100 : null);
  const [coupon] = useState(discountCoupon ? discountCoupon / 100 : null);
  const dispatch = useDispatch();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChangeAmount = async (number: number) => {
    if (productAmount === 1 && number === -1) return;
    if (productAmount === 20 && number === 1) return;

    setIsUpdating(true);

    const lineItem: LineItem = {
      lineItemId,
      quantity: productAmount + number,
    };
    try {
      await cartInteraction(lineItem, dispatch, 'changeLineItemQuantity');
      setProductAmount(prevState => prevState + number);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    setSum((discount ? discount : coupon ? coupon : price.value.centAmount / 100) * productAmount);
  }, [productAmount]);

  const handleRemoveFromCart = async (e: React.MouseEvent) => {
    dispatch(cartSlice.actions.isRemoveItem(true));
    e.preventDefault();
    const lineItem: LineItem = {
      lineItemId: lineItemId,
      quantity: productAmount,
    };

    await cartInteraction(lineItem, dispatch, 'removeLineItem');
    dispatch(cartSlice.actions.isRemoveItem(false));
  };

  const size = variant.attributes.find(attr => attr.name === 'size')?.value;
  const variantCard = size ? (
    <ProductVariantCard id={size} price={+price.value.centAmount / 100} discounted={discount} isActive={true} />
  ) : (
    <></>
  );

  return (
    <div className='cart-item'>
      <div className='cart-item__image-container'>
        <Image
          className='cart-item__img'
          src={variant.images[0].url}
          alt='Product photo'
          fill
          sizes='(max-width: 768px) 250px, 263px'
        />
      </div>
      <div className='cart-item__info'>
        <p className='info-name'>{name}</p>
        <div className='info-block'>
          <div className='cart-item__variant'>{variantCard}</div>
          <ProductAmountSetter productAmount={productAmount} onChange={handleChangeAmount} disabled={isUpdating} />
        </div>
        <p className='info-coupon'>{coupon && 'COUPON - RS'}</p>
        <ProductSum sum={sum} coupon={coupon} price={price.value.centAmount / 100} />
      </div>
      <IconButton className='close-icon' onClick={handleRemoveFromCart}>
        <CloseIcon />
      </IconButton>
    </div>
  );
};

export default CartItem;
