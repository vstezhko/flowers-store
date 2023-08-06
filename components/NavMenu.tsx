'use client';

import NavLink from '@/components/NavLink';
import { usePathname } from 'next/navigation';
import LogoIcon from '@/components/LogoIcon';
import React from 'react';
import UserIcon from '@/components/UserIcon';

export interface MenuParams {
  id: number;
  path: string;
  title: string;
  icon: React.ReactNode | null;
  pathName: string;
}

type MenuParamsWithoutPathName = Pick<MenuParams, 'id' | 'path' | 'title' | 'icon'>;

const menuItems: MenuParamsWithoutPathName[] = [
  { id: 1, path: '/catalog', title: 'Catalog', icon: null },
  { id: 2, path: '/reviews', title: 'Reviews', icon: null },
  { id: 3, path: '/contacts', title: 'Contacts', icon: null },
  { id: 4, path: '/', title: '', icon: <LogoIcon /> },
  { id: 5, path: '/info', title: 'Info for clients', icon: null },
  { id: 6, path: '/orders', title: 'My orders', icon: <UserIcon /> },
];

const NavMenu = () => {
  const pathname = usePathname();
  return (
    <nav className='header-nav'>
      {menuItems.map(({ id, path, title, icon }) => (
        <NavLink path={path} key={id} title={title} pathName={pathname} icon={icon} />
      ))}
      <div className='header-nav__currency'>
        {/*TODO: add radio btn*/}
        <p>EUR</p>
        <p>USD</p>
      </div>
    </nav>
  );
};

export default NavMenu;
