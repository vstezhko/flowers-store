'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Skeleton, useMediaQuery } from '@mui/material';
import { MenuParamsWithoutPathName } from '@/components/header/Header';
import NavLink from '@/components/nav/NavLink';
import MobileMenu from '@/components/nav/MobileMenu';
import BurgerIcon from '@/components/nav/BurderIcon';
import { ReduxState, useSelector } from '@/redux/store';
import UserIcon from '../Icons/UserIcon';
import { TokenService } from '@/api/services/Token.service';
import { TokenType } from '@/types/enums';
import FlowerIcon from '@/components/Icons/FlowerIcon';

const NavMenu = ({ menuItems }: { menuItems: MenuParamsWithoutPathName[] }) => {
  const pathname = usePathname();
  const matches = useMediaQuery('(max-width:768px)');
  const logo = menuItems.find(item => item.className === 'logo');
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const { access_token } = useSelector((state: ReduxState) => state.auth);
  const [tokenType, setTokenType] = useState(null);

  useEffect(() => {
    const token = TokenService.getAccessTokenFromLS();
    setTokenType(token?.type);
  }, [access_token]);

  const authContent = (
    <NavLink path='/profile' title={matches ? '' : 'My Profile'} pathName={pathname} icon={<UserIcon />} className='' />
  );
  const guestContent = (
    <>
      <NavLink path='/login' title='Sign In' pathName='' icon={null} className='' />
      <FlowerIcon />
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
          <div className='nav__burger-container'>
            <BurgerIcon onClick={toggleMenu} isOpen={menuOpen} />
          </div>
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
      <div className='nav__auth'>
        {tokenType === TokenType.CUSTOMER ? (
          authContent
        ) : tokenType === null ? (
          <Skeleton variant='circular' width={40} height={40} />
        ) : (
          guestContent
        )}
      </div>
    </nav>
  );
};

export default NavMenu;
