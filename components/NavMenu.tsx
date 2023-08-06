'use client';

import NavLink from '@/components/NavLink';
import { usePathname } from 'next/navigation';
import React from 'react';
import { MenuParamsWithoutPathName } from '@/components/Header';

export interface NavMenuProps {
  menuItems: MenuParamsWithoutPathName[];
  currency: boolean;
}

const NavMenu: React.FC<NavMenuProps> = ({ menuItems, currency }) => {
  const pathname = usePathname();
  return (
    <nav className='nav container'>
      {menuItems.map(({ id, path, title, icon }) => (
        <NavLink path={path} key={id} title={title} pathName={pathname} icon={icon} />
      ))}
      {currency && (
        <div className='nav__currency'>
          {/*TODO: add radio btn*/}
          <p>EUR</p>
          <p>USD</p>
        </div>
      )}
    </nav>
  );
};

export default NavMenu;
