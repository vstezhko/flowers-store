'use client';
import React, { useEffect, useState } from 'react';
import FsButton from '@/components/UI/FsButton';
import { FsButtonType } from '@/types/enums';
import { getCartAsync } from '@/redux/slices/cartSlice/thunk';
import { useDispatch, useSelector } from '@/redux/store';
import { TokenService } from '@/api/services/Token.service';
import { CartService } from '@/api/services/Cart.services';
import CartItem from '@/components/cart/CartItem';
import EmptyCart from '@/components/cart/EmptyCart';
import CartDiscountCode from '@/components/cart/CartDiscountCode';

const Cart = () => {
  const dispatch = useDispatch();
  const { totalLineItemQuantity, lineItems, totalPrice } = useSelector(state => state.cart);
  const [cart, setCart] = useState<{ id: string; version: number } | null | undefined>(undefined);

  useEffect(() => {
    const cartLS = CartService.getCartFromLS();
    setCart(cartLS);
    const token = TokenService.getAccessTokenFromLS();

    if (token && cartLS)
      dispatch(
        getCartAsync({
          token: token?.token,
          cartId: cartLS?.id,
        })
      );
  }, []);

  if ((totalLineItemQuantity !== null && totalLineItemQuantity < 1) || cart === null) {
    return <EmptyCart />;
  } else {
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
            <CartDiscountCode />
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
  }
};

export default Cart;
