import React from 'react';
import { MenuParams } from '@/components/Header';
import NavMenu from '@/components/NavMenu';

export type MenuParamsWithoutPathName = Pick<MenuParams, 'id' | 'path' | 'title' | 'icon'>;

const menuItems: MenuParamsWithoutPathName[] = [
  { id: 1, path: '/catalog', title: 'Catalog', icon: null },
  { id: 2, path: '/discounts', title: 'Discounts', icon: null },
  { id: 3, path: '/reviews', title: 'Reviews', icon: null },
  { id: 4, path: '/contacts', title: 'Contacts', icon: null },
  { id: 6, path: '/offer', title: 'Offer', icon: null },
  { id: 5, path: '/info', title: 'Info for clients', icon: null },
];
const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-nav'>
        <NavMenu menuItems={menuItems} currency={false}/>
      </div>
    </footer>
  );
};

export default Footer;
