'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button, useMediaQuery } from '@mui/material';
import { MenuParamsWithoutPathName } from '@/components/header/Header';
import NavLink from '@/components/nav/NavLink';
import MobileMenu from '@/components/nav/MobileMenu';
import BurgerIcon from '@/components/nav/BurderIcon';
import UserIcon from '../Icons/UserIcon';
import { useSelector } from '@/redux/store';
import { TokenService } from '@/api/services/Token.service';
import { FsButtonType, TokenType } from '@/types/enums';
import FsButton from '@/components/UI/FsButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const ProfileContent = ({ handleLogout }: { handleLogout: () => void }) => {
  const { access_token } = useSelector(state => state.auth);
  const [tokenType, setTokenType] = useState<string | null>(null);

  useEffect(() => {
    const token = TokenService.getAccessTokenFromLS();
    if (token) setTokenType(token.type);
  }, [access_token]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='nav__profile'>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        <UserIcon />
        <h5>Profile</h5>
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <MenuItem onClick={handleClose}>
          {tokenType === TokenType.CUSTOMER ? (
            <NavLink path='/profile' title='My Profile' pathName='' icon={null} className='' />
          ) : (
            <NavLink path='/login' title='Sign In' pathName='' icon={null} className='' />
          )}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {tokenType === TokenType.CUSTOMER ? (
            <FsButton className={FsButtonType.SMALL} variant='outlined' label='Log Out' onClick={handleLogout} />
          ) : (
            <NavLink path='/signup' title='Sign Up' pathName='' icon={null} className='' />
          )}
        </MenuItem>
      </Menu>
    </div>
  );
};

const NavMenu = ({ menuItems, handleLogout }: { menuItems: MenuParamsWithoutPathName[]; handleLogout: () => void }) => {
  const pathname = usePathname();
  const matches = useMediaQuery('(max-width:768px)');
  const logo = menuItems.find(item => item.className === 'logo');
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav className='nav container'>
      {matches ? (
        <>
          <div className='nav__burger-container'>
            <BurgerIcon onClick={toggleMenu} isOpen={menuOpen} name='nav__burger' />
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
      <ProfileContent handleLogout={handleLogout} />
    </nav>
  );
};

export default NavMenu;
