import CartIcon from '@/components/Icons/CartIcon';
import Badge from '@mui/material/Badge';
import { Skeleton } from '@mui/material';

export interface HeaderCartParams {
  sum: string;
  invisible: boolean;
  quantity: number;
  loading: boolean;
}

const HeaderCart = (props: HeaderCartParams) => {
  return props.loading ? (
    <Skeleton width={123} height={23} />
  ) : (
    <div className='header-menu__cart'>
      <Badge badgeContent={props.quantity} color='primary' invisible={props.invisible}>
        <CartIcon />
      </Badge>
      <div className='cart__sum'>{props.sum} EUR</div>
    </div>
  );
};

export default HeaderCart;
