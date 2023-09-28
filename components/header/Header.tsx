import BulletIcon from '@/components/Icons/BulletIcon';
import PhoneIcon from '@/components/Icons/PhoneIcon';
import HeaderCart from '@/components/header/HeaderCart';
import NavMenu from '@/components/nav/NavMenu';
import React, { useEffect, useState } from 'react';
import LogoIcon from '@/components/Icons/LogoIcon';
import NavLink from '@/components/nav/NavLink';
import { useDispatch, useSelector } from '@/redux/store';
import { TokenService } from '@/api/services/Token.service';
import { CartService } from '@/api/services/Cart.services';
import { loginSlice } from '@/redux/slices/loginSlice/loginSlice';
import { snackbarSlice } from '@/redux/slices/snackbarSlice/snackbarSlice';
import { useRouter } from 'next/navigation';
import { cartSlice } from '@/redux/slices/cartSlice/cartSlice';

export interface MenuParams {
  id: number;
  path: string;
  title: string;
  icon: React.ReactNode | null;
  pathName: string;
  className: string;
  mobile?: boolean;
  onClick?: () => void;
}

export type MenuParamsWithoutPathName = Pick<MenuParams, 'id' | 'path' | 'title' | 'icon' | 'className' | 'mobile'>;

export const menuItems: MenuParamsWithoutPathName[] = [
  { id: 1, path: '/catalog', title: 'Catalog', icon: null, className: 'link', mobile: true },
  { id: 2, path: '/discounts', title: 'Discounts', icon: null, className: 'link', mobile: true },
  { id: 3, path: '/about', title: 'About Us', icon: null, className: 'link', mobile: true },
  { id: 4, path: '/', title: '', icon: <LogoIcon />, className: 'logo' },
  { id: 5, path: '/reviews', title: 'Reviews', icon: null, className: 'link', mobile: true },
  { id: 6, path: '/contacts', title: 'Contacts', icon: null, className: 'link', mobile: true },
];

const Header = () => {
  const [invisible, setInvisible] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [sum, setSum] = useState('0');
  const { totalLineItemQuantity, totalPrice, lineItems } = useSelector(state => state.cart);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    TokenService.removeTokensFromLS();
    CartService.removeCartFromLS();
    dispatch(loginSlice.actions.setIsLogin(false));
    dispatch(loginSlice.actions.setIsSignUp(false));
    dispatch(loginSlice.actions.removeCustomer());
    dispatch(cartSlice.actions.clearCart());
    dispatch(snackbarSlice.actions.setMessage({ message: 'Successful logout', variant: 'success' }));
    router.push('/');
    setSum('0');
    setQuantity(0);
    setInvisible(true);
  };

  useEffect(() => {
    setLoading(false);
    if (totalLineItemQuantity && totalLineItemQuantity > 0) {
      setInvisible(false);
    }
    const totalQuantity = lineItems.reduce((acc, init) => acc + init.quantity, 0);
    setQuantity(totalQuantity);
    if (totalPrice) {
      setSum((totalPrice.centAmount / 100).toString());
    } else {
      setSum('0');
    }
  }, [totalLineItemQuantity, loading, totalPrice, lineItems]);

  return (
    <header className='header'>
      <div className='header-menu'>
        <div className='header-menu__container container'>
          <div className='header-menu__phone'>
            <a className='phone' href='tel:+48573888888'>
              <PhoneIcon />
              <div className='phone__phone-number'>+ 48 573 888 888</div>
            </a>
          </div>
          <div className='header-menu__address'>
            <BulletIcon />
            <p>
              <span>Warsaw,</span> Pola Karolinskie 2a
            </p>
          </div>
          <NavLink
            path='/cart'
            title=''
            icon={<HeaderCart sum={sum} invisible={invisible} quantity={quantity} loading={loading} />}
            pathName=''
            className=''
          />
        </div>
      </div>
      <div className='header-nav'>
        <NavMenu menuItems={menuItems} handleLogout={handleLogout} />
      </div>
    </header>
  );
};

export default Header;
