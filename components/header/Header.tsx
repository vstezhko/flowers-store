'use client';
import BulletIcon from '@/components/Icons/BulletIcon';
import PhoneIcon from '@/components/Icons/PhoneIcon';
import HeaderCart from '@/components/header/HeaderCart';
import NavMenu from '@/components/nav/NavMenu';
import React, { useEffect, useState } from 'react';
import LogoIcon from '@/components/Icons/LogoIcon';
import NavLink from '@/components/nav/NavLink';
import { useSelector } from '@/redux/store';

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
  const { cartProductsIds, totalPrice } = useSelector(state => state.cart);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (cartProductsIds.length > 0) setInvisible(false);
    setQuantity(cartProductsIds.length);
    if (totalPrice) {
      setSum((totalPrice / 100).toString());
      setLoading(false);
    }
  }, [cartProductsIds.length, loading]);

  return (
    <header className='header'>
      <div className='header-menu'>
        <div className='header-menu__container container'>
          <div className='header-menu__phone'>
            <PhoneIcon />
            <a className='phone' href='tel:+48573888888'>
              + 48 573 888 888
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
        <NavMenu menuItems={menuItems} />
      </div>
    </header>
  );
};

export default Header;
