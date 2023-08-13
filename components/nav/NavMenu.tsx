'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from '@mui/material';
import { MenuParamsWithoutPathName } from '@/components/header/Header';
import NavLink from '@/components/nav/NavLink';
import MobileMenu from '@/components/nav/MobileMenu';
import BurgerIcon from './BurderIcon';

const NavMenu = ({ menuItems }: { menuItems: MenuParamsWithoutPathName[] }) => {
  const pathname = usePathname();
  const matches = useMediaQuery('(max-width:650px)');
  const logo = menuItems.find(item => item.className === 'logo');
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  if (matches) {
    return (
      <nav className='nav container'>
        <BurgerIcon onClick={toggleMenu} isOpen={menuOpen} />
        <MobileMenu menuItems={menuItems} isOpen={menuOpen} />
        {logo && (
          <NavLink
            path={logo.path}
            key={logo.id}
            title={logo.title}
            pathName={pathname}
            icon={logo.icon}
            className={logo.className}
          />
        )}
        <div className='nav__auth'>
          <NavLink path='/login' title='Login' pathName='' icon={null} className='' />
          <p>|</p>
          <NavLink path='/signup' title='Sign Up' pathName='' icon={null} className='' />
        </div>
      </nav>
    );
  } else {
    return (
      <nav className='nav container'>
        {menuItems.map(({ id, path, title, icon, className }) => (
          <NavLink path={path} key={id} title={title} pathName={pathname} icon={icon} className={className} />
        ))}
        <div className='nav__auth'>
          <NavLink path='/login' title='Login' pathName='' icon={null} className='' />
          <p>|</p>
          <NavLink path='/signup' title='Sign Up' pathName='' icon={null} className='' />
        </div>
      </nav>
    );
  }
};

export default NavMenu;
