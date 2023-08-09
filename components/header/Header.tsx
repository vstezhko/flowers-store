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
}

export type MenuParamsWithoutPathName = Pick<MenuParams, 'id' | 'path' | 'title' | 'icon'>;

export const menuItems: MenuParamsWithoutPathName[] = [
  { id: 1, path: '/catalog', title: 'Catalog', icon: null },
  { id: 2, path: '/reviews', title: 'Reviews', icon: null },
  { id: 3, path: '/contacts', title: 'Contacts', icon: null },
  { id: 4, path: '/', title: '', icon: <LogoIcon /> },
  { id: 5, path: '/info', title: 'Info for clients', icon: null },
  { id: 6, path: '/profile', title: 'My profile', icon: <UserIcon /> },
  { id: 7, path: '/login', title: 'Login', icon: null },
  { id: 8, path: '/signup', title: 'Sigh up', icon: null },
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
        <NavMenu menuItems={menuItems} currency={true} />
      </div>
    </header>
  );
};

export default Header;
