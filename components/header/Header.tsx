import BulletIcon from '@/components/Icons/BulletIcon';
import PhoneIcon from '@/components/Icons/PhoneIcon';
import HeaderCart from '@/components/header/HeaderCart';
import NavMenu from '@/components/nav/NavMenu';
import React from 'react';
import LogoIcon from '@/components/Icons/LogoIcon';
import UserIcon from '@/components/Icons/UserIcon';

export interface MenuParams {
  id: number;
  path: string;
  title: string;
  icon: React.ReactNode | null;
  pathName: string;
  className: string;
}

export type MenuParamsWithoutPathName = Pick<MenuParams, 'id' | 'path' | 'title' | 'icon' | 'className'>;

export const menuItems: MenuParamsWithoutPathName[] = [
  { id: 1, path: '/catalog', title: 'Catalog', icon: null, className: '' },
  { id: 2, path: '/reviews', title: 'Reviews', icon: null, className: '' },
  { id: 3, path: '/contacts', title: 'Contacts', icon: null, className: '' },
  { id: 4, path: '/', title: '', icon: <LogoIcon />, className: 'logo' },
  { id: 5, path: '/info', title: 'Info for clients', icon: null, className: '' },
  { id: 6, path: '/profile', title: 'My profile', icon: <UserIcon />, className: '' },
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
              <a className='phone' href='tel:+78083535335'>
                + 7 808 353 53 35
              </a>
            </div>
            <a className='phone' href='tel:+78083535335'>
              + 7 808 353 53 35
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
