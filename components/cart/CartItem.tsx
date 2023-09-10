import React, { FC, useState } from 'react';
import ProductAmountSetter from '@/components/product/ProductAmountSetter';
import ProductSum from '@/components/product/ProductSum';
import { IconButton } from '@mui/material';
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon';
import { ProductPrice, ProductVariant } from '@/redux/slices/productSlice/productSlice';
import ProductVariantCard from '@/components/product/ProductVariantCard';
import Image from 'next/image';

export interface CartItemParams {
  name: string;
  productId: string;
  quantity: number;
  price: ProductPrice;
  totalPrice: ProductPrice['value'];
  variant: ProductVariant;
}

const CartItem: FC<CartItemParams> = ({ name, quantity, price, totalPrice, variant }) => {
  const [productAmount, setProductAmount] = useState(1);
  const handleChangeAmount = (number: number) => {
    if (productAmount === 1 && number === -1) return;
    if (productAmount === 20 && number === 1) return;
    setProductAmount(prevState => prevState + number);
  };

  const size = variant.attributes.find(attr => attr.name === 'size')?.value;
  const variantCard = size ? (
    <ProductVariantCard
      id={size}
      price={+price.value.centAmount / 100}
      discounted={price.discounted ? price.discounted.value.centAmount / 100 : null}
      isActive={true}
    />
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
            <ProductAmountSetter productAmount={quantity} onChange={handleChangeAmount} />
            <ProductSum sum={totalPrice.centAmount / 100} />
          </div>
        </div>

        <IconButton className='close-icon'>
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default CartItem;
