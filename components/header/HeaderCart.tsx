import CartIcon from '@/components/Icons/CartIcon';
import Badge from '@mui/material/Badge';

export interface HeaderCartParams {
  sum: string;
  invisible: boolean;
  quantity: number;
}

const HeaderCart = (props: HeaderCartParams) => {
  return (
    <div className='header-menu__cart'>
      <Badge badgeContent={props.quantity} color='primary' invisible={props.invisible}>
        <CartIcon />
      </Badge>
      <div className='cart__sum'>{props.sum} EUR</div>
    </div>
  );
};

export default HeaderCart;
