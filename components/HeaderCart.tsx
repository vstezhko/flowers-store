import React from 'react';
import CartIcon from '@/components/CartIcon';

interface HeaderCartParams {
  sum: string;
}

const HeaderCart = (props: HeaderCartParams) => {
  return (
    <div className='header-cart'>
      <CartIcon />
      <div className='header-cart__sum'>${props.sum}</div>
    </div>
  );
};

export default HeaderCart;
