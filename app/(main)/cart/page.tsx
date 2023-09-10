'use client';
import React, { useEffect } from 'react';
import FsInput from '@/components/UI/FsInput';
import FsButton from '@/components/UI/FsButton';
import { FsButtonType } from '@/types/enums';
import { getCartAsync } from '@/redux/slices/cartSlice/thunk';
import { useDispatch, useSelector } from '@/redux/store';
import { TokenService } from '@/api/services/Token.service';
import { CartService } from '@/api/services/Cart.services';
import CartItem from '@/components/cart/CartItem';

const Cart = () => {
  const dispatch = useDispatch();
  const { lineItems, totalPrice } = useSelector(state => state.cart);

  useEffect(() => {
    const token = TokenService.getAccessTokenFromLS();
    const cart = CartService.getCartFromLS();
    if (token && cart)
      dispatch(
        getCartAsync({
          token: token?.token,
          cartId: cart?.id,
        })
      );
  }, []);

  return (
    <section className='page'>
      <h1 className='page__title'>Cart</h1>
      <div className='cart__container'>
        <div className='cart__products'>
          {lineItems.map(item => (
            <CartItem
              key={item.id}
              name={item.name.en}
              price={item.price}
              productId={item.productId}
              quantity={item.quantity}
              totalPrice={item.totalPrice}
              variant={item.variant}
            />
          ))}
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
              <p>{totalPrice ? totalPrice?.centAmount / 100 : ''} EUR</p>
            </div>
            <FsButton label='Confirm' onClick={() => console.log('hhh')} className={FsButtonType.REGULAR} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
