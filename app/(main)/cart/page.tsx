import React from 'react';

const Cart = () => {
  return (
    <section className='page'>
      <h1 className='page__title'>Cart</h1>
      <div className='cart__container'>
        <div className='cart__products'>
          <div className='cart__product-card'></div>
        </div>
        <div className='cart__info'></div>
      </div>
    </section>
  );
};

export default Cart;
