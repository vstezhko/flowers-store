import BulletIcon from '@/components/Icons/BulletIcon';
import PhoneIcon from '@/components/Icons/PhoneIcon';
import HeaderCart from '@/components/header/HeaderCart';
import NavMenu from '@/components/nav/NavMenu';
import React from 'react';
import LogoIcon from '@/components/Icons/LogoIcon';

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
  { id: 3, path: '/about', title: 'About us', icon: null, className: 'link', mobile: true },
  { id: 4, path: '/', title: '', icon: <LogoIcon />, className: 'logo' },
  { id: 5, path: '/reviews', title: 'Reviews', icon: null, className: 'link', mobile: true },
  { id: 6, path: '/contacts', title: 'Contacts', icon: null, className: 'link', mobile: true },
];

const Header = () => {
  return (
    <header className='header'>
      <div className='header-menu'>
        <div className='header-menu__container container'>
          <div className='header-menu__address'>
            <BulletIcon />
            <p>
              <span>Warsaw,</span> Pola Karolinskie 2a
            </p>
          </div>
          <div className='header-menu__phone'>
            <PhoneIcon />
            <div className='phone__container'>
              <p>WhatsApp</p>
              <a className='phone' href='tel:+48573888888'>
                + 48 573 888 888
              </a>
            </div>
            <a className='phone' href='tel:+48573888888'>
              + 48 573 888 888
            </a>
          </div>
          <HeaderCart sum='0' />
        </div>
      </div>
      <div className='header-nav'>
        <NavMenu menuItems={menuItems} />
      </div>
    </header>
  );
};

export default Header;
