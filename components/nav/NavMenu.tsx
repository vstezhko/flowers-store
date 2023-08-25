'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button, List, ListItem, Popover, useMediaQuery } from '@mui/material';
import { MenuParamsWithoutPathName } from '@/components/header/Header';
import NavLink from '@/components/nav/NavLink';
import MobileMenu from '@/components/nav/MobileMenu';
import BurgerIcon from '@/components/nav/BurderIcon';
import UserIcon from '../Icons/UserIcon';
import { useDispatch, useSelector } from '@/redux/store';
import { TokenService } from '@/api/services/Token.service';
import { FsButtonType, TokenType } from '@/types/enums';
import FsButton from '@/components/UI/FsButton';
import { useSnackbar } from 'notistack';
import { loginSlice } from '@/redux/slices/loginSlice/loginSlice';

const ProfileContent = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const ID = open ? 'simple-popover' : undefined;

  const { access_token } = useSelector(state => state.auth);
  const [tokenType, setTokenType] = useState(null);

  useEffect(() => {
    const token = TokenService.getAccessTokenFromLS();
    setTokenType(token?.type);
  }, [access_token]);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = () => {
    TokenService.removeTokensFromLS();
    dispatch(loginSlice.actions.setIsLogin(false));
    dispatch(loginSlice.actions.setIsSignUp(false));
    dispatch(loginSlice.actions.removeCustomer());
    enqueueSnackbar('Successful logout', { variant: 'success' });
  };

  return (
    <div className='nav__profile'>
      <Button aria-describedby={ID} onClick={handleClick}>
        <UserIcon />
        <p>Profile</p>
      </Button>
      <Popover
        id={ID}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        {tokenType === TokenType.CUSTOMER ? (
          <List>
            <ListItem>
              <NavLink path='/profile' title='My Profile' pathName='' icon={null} className='' />
            </ListItem>
            <ListItem>
              <FsButton className={FsButtonType.SMALL} variant='outlined' label='Log Out' onClick={handleLogout} />
            </ListItem>
          </List>
        ) : (
          <List>
            <ListItem>
              <NavLink path='/login' title='Sign In' pathName='' icon={null} className='' />
            </ListItem>
            <ListItem>
              <NavLink path='/signup' title='Sign Up' pathName='' icon={null} className='' />
            </ListItem>
          </List>
        )}
      </Popover>
    </div>
  );
};

const NavMenu = ({ menuItems }: { menuItems: MenuParamsWithoutPathName[] }) => {
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
      <ProfileContent />
    </nav>
  );
};

export default NavMenu;
