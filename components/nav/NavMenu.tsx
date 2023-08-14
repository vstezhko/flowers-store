'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { MenuParamsWithoutPathName } from '@/components/header/Header';
import NavLink from '@/components/nav/NavLink';
import MobileMenu from '@/components/nav/MobileMenu';
import BurgerIcon from '@/components/nav/BurderIcon';
import { ReduxState } from '@/redux/store';
import UserIcon from '../Icons/UserIcon';

const NavMenu = ({ menuItems }: { menuItems: MenuParamsWithoutPathName[] }) => {
  const pathname = usePathname();
  const matches = useMediaQuery('(max-width:650px)');
  const logo = menuItems.find(item => item.className === 'logo');
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isLogin = useSelector((state: ReduxState) => state.login.isLogin);
  const authContent = (
    <NavLink path='/profile' title={matches ? '' : 'My Profile'} pathName={pathname} icon={<UserIcon />} className='' />
  );
  const guestContent = (
    <>
      <NavLink path='/login' title='Login' pathName='' icon={null} className='' />
      <p>|</p>
      <NavLink path='/signup' title='Sign Up' pathName='' icon={null} className='' />
    </>
  );

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav className='nav container'>
      {matches ? (
        <>
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
        </>
      ) : (
        menuItems.map(({ id, path, title, icon, className }) => (
          <NavLink path={path} key={id} title={title} pathName={pathname} icon={icon} className={className} />
        ))
      )}
      <div className='nav__auth'>{isLogin ? authContent : guestContent}</div>
    </nav>
  );
};

export default NavMenu;
