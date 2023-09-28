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
import ConfirmationPrompt from '@/components/cart/ConfirmationPrompt';

const Cart = () => {
  const dispatch = useDispatch();
  const { totalLineItemQuantity, lineItems, totalPrice, cartCoupons } = useSelector(state => state.cart);
  const [cart, setCart] = useState<{ id: string; version: number } | null | undefined>(undefined);
  const [discount, setDiscount] = useState(0);
  const [price, setPrice] = useState(0);
  const [coupon, setCoupon] = useState(0);
  const [openModal, setOpenModal] = React.useState(false);

  useEffect(() => {
    const totalCartSummary = lineItems.reduce(
      (acc, item) => {
        const priceValue = item.price.value.centAmount * item.quantity || 0;
        const discountValue = priceValue - item.price.discounted?.value.centAmount * item.quantity || 0;
        const discountCoupon = priceValue - +item.discountedPrice?.value.centAmount * item.quantity || 0;

        acc.priceTotal += priceValue / 100;
        acc.discountTotal += discountValue / 100;
        acc.discountCouponTotal += discountCoupon / 100;
        return acc;
      },
      { priceTotal: 0, discountTotal: 0, discountCouponTotal: 0 }
    );
    setPrice(totalCartSummary.priceTotal);
    setDiscount(totalCartSummary.discountTotal);
    setCoupon(totalCartSummary.discountCouponTotal);
  }, [lineItems, discount, price, coupon]);

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

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <section className='page'>
      <h1 className='page__title'>Cart</h1>
      {(totalLineItemQuantity !== null && totalLineItemQuantity < 1) || !totalLineItemQuantity || cart === null ? (
        <EmptyCart />
      ) : (
        <div className='cart__container'>
          <div className='cart__products'>
            {lineItems.map(item => (
              <CartItem
                key={item.id}
                lineItemId={item.id}
                name={item.name.en}
                price={item.price}
                productId={item.productId}
                quantity={item.quantity}
                discountCoupon={item.discountedPrice ? +item.discountedPrice?.value.centAmount : null}
                variant={item.variant}
              />
            ))}
          </div>
          <div className='cart__info'>
            <CartDiscountCode />
            <div className='info__total'>
              <div>
                <span>COST</span>
                <p>{price.toFixed(2)} EUR</p>
              </div>
              {discount ? (
                <div>
                  <span>DISCOUNT</span>
                  <p className='discount'>- {discount.toFixed(2)} EUR</p>
                </div>
              ) : null}
              {cartCoupons.length > 0 ? (
                <div>
                  <span>COUPONS</span>
                  <p className='discount'>- {coupon.toFixed(2)} EUR</p>
                </div>
              ) : null}
              <div className='total'>
                <span>TOTAL</span>
                <p>{totalPrice ? (totalPrice?.centAmount / 100).toFixed(2) : ''} EUR</p>
              </div>
              <div className='cart__buttons'>
                <FsButton label='Confirm' onClick={() => console.log('confirm')} className={FsButtonType.REGULAR} />
                <FsButton
                  label='Clear Cart'
                  variant='outlined'
                  onClick={() => {
                    handleClickOpen();
                  }}
                  className={FsButtonType.REGULAR}
                />
              </div>
            </div>
          </div>
          <ConfirmationPrompt open={openModal} handleClose={handleClose} />
        </div>
      )}
    </section>
  );
};

export default Cart;
