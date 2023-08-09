import CartIcon from '@/components/Icons/CartIcon';

export interface HeaderCartParams {
  sum: string;
}

const HeaderCart = (props: HeaderCartParams) => {
  return (
    <div className='header-menu__cart'>
      <CartIcon />
      <div className='cart__sum'>$ {props.sum}</div>
    </div>
  );
};

export default HeaderCart;
