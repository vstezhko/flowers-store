'use client';

import NavLink from '@/components/nav/NavLink';
import { usePathname } from 'next/navigation';
import React from 'react';
import { MenuParamsWithoutPathName } from '@/components/header/Header';

const NavMenu = ({ menuItems }: { menuItems: MenuParamsWithoutPathName[] }) => {
  const pathname = usePathname();
  return (
    <nav className='nav container'>
      {menuItems.map(({ id, path, title, icon }) => (
        <NavLink path={path} key={id} title={title} pathName={pathname} icon={icon} />
      ))}
      <div className='nav__auth'>
        <NavLink path='/login' title='Login' pathName='' icon={null} />
        <p>|</p>
        <NavLink path='/signup' title='Sign Up' pathName='' icon={null} />
      </div>
    </nav>
  );
};

export default NavMenu;
