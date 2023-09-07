'use client';
import React, { useState } from 'react';
import ProductAmountSetter from '@/components/product/ProductAmountSetter';
import { IconButton } from '@mui/material';
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon';
import ProductSum from '@/components/product/ProductSum';
import FsInput from '@/components/UI/FsInput';
import FsButton from '@/components/UI/FsButton';
import { FsButtonType } from '@/types/enums';

const Cart = () => {
  const [productAmount, setProductAmount] = useState(1);
  const handleChangeAmount = (number: number) => {
    if (productAmount === 1 && number === -1) return;
    if (productAmount === 20 && number === 1) return;
    setProductAmount(prevState => prevState + number);
  };
  return (
    <section className='page'>
      <h1 className='page__title'>Cart</h1>
      <div className='cart__container'>
        <div className='cart__products'>
          <div className='cart__product-card'>
            <img className='product-card__img' src='https://tea-rose.com.ua/img/products/1657280780_19869.jpg' alt='' />
            <div className='product-card__info'>
              <div>Bouqet name</div>
              <ProductAmountSetter productAmount={productAmount} onChange={handleChangeAmount} />
              <ProductSum sum={200} />
              <IconButton className='close-icon'>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <div className='cart__product-card'>
            <img className='product-card__img' src='https://tea-rose.com.ua/img/products/1657280780_19869.jpg' alt='' />
            <div className='product-card__info'>
              <div>Bouqet name</div>
              <ProductAmountSetter productAmount={productAmount} onChange={handleChangeAmount} />
              <ProductSum sum={200} />
              <IconButton className='close-icon'>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        </div>
        <div className='cart__info'>
          <div className='info__coupon'>
            <FsInput id='jfhjgj' name='hjfhgh' type='text' label='coupon' onChange={() => console.log('hhh')} />
            <FsButton
              label='apply'
              onClick={() => console.log('hhh')}
              className={FsButtonType.SMALL}
              variant='outlined'
            />
          </div>
          <div className='info__total'>
            <div>
              <span>COST</span>
              <p>200 EUR</p>
            </div>
            <div>
              <span>DISCOUNT</span>
              <p>10 EUR</p>
            </div>
            <div className='total'>
              <span>TOTAL</span>
              <p>190 EUR</p>
            </div>
            <FsButton label='Confirm' onClick={() => console.log('hhh')} className={FsButtonType.REGULAR} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
