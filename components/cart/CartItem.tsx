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
  totalPrice: ProductPrice['value'];
  variant: ProductVariant;
  lineItemId: string;
}

const CartItem: FC<CartItemParams> = ({ lineItemId, name, quantity, price, totalPrice, variant }) => {
  const [productAmount, setProductAmount] = useState(quantity || 1);
  const [sum, setSum] = useState(totalPrice.centAmount / 100);
  const [discount] = useState(price.discounted ? price.discounted.value.centAmount / 100 : null);
  const dispatch = useDispatch();

  const handleChangeAmount = async (number: number) => {
    if (productAmount === 1 && number === -1) return;
    if (productAmount === 20 && number === 1) return;

    const lineItem: LineItem = {
      lineItemId,
      quantity: productAmount + number,
    };
    await cartInteraction(lineItem, dispatch, 'changeLineItemQuantity');
    setProductAmount(prevState => prevState + number);
  };

  useEffect(() => {
    setSum((discount ? discount : price.value.centAmount / 100) * productAmount);
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
        <div className='cart-item__prop-info'>
          <p>{name}</p>
          <div className='cart-item__prop'>
            <div className='cart-item__variant'>{variantCard}</div>
            <ProductAmountSetter productAmount={productAmount} onChange={handleChangeAmount} />
            <ProductSum sum={sum} />
          </div>
        </div>

        <IconButton className='close-icon' onClick={handleRemoveFromCart}>
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default CartItem;
