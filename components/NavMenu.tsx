'use client';

import NavLink from '@/components/NavLink';
import { usePathname } from 'next/navigation';
import React from 'react';
import { MenuParamsWithoutPathName } from '@/components/Header';

export interface NavMenuProps {
  menuItems: MenuParamsWithoutPathName[];
}

const NavMenu: React.FC<NavMenuProps> = ({ menuItems }) => {
  const pathname = usePathname();
  return (
    <nav className='header-nav container'>
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
