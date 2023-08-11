import React from 'react';
import Link from 'next/link';
import { MenuParams } from '@/components/header/Header';
// import FlowerIcon from '@/components/Icons/FlowerIcon';

type MenuParamsWithoutId = Pick<MenuParams, 'pathName' | 'path' | 'title' | 'icon' | 'className'>;

const NavLink: React.FC<MenuParamsWithoutId> = ({ title = '', path = '', pathName = '', icon, className }) => {
  // const showFlowerIcon = path !== '/profile' && path !== '/';
  const isActive = pathName === path;
  return (
    <Link href={path} className={`nav__link ${className}`}>
      {!icon ? null : icon}
      {/*{showFlowerIcon && isActive && <FlowerIcon />}*/}
      <h5 className={isActive ? 'link-title link-title_active' : 'link-title'}>{title}</h5>
    </Link>
  );
};

export default NavLink;
