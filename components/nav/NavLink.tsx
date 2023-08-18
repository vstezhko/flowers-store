import React from 'react';
import Link from 'next/link';
import { MenuParams } from '@/components/header/Header';

type MenuParamsWithoutId = Pick<MenuParams, 'pathName' | 'path' | 'title' | 'icon' | 'className'> & {
  onClick?: () => void;
};

const NavLink: React.FC<MenuParamsWithoutId> = ({ title = '', path = '', pathName = '', icon, className, onClick }) => {
  const isActive = pathName === path;
  return (
    <Link href={path} className={`nav__link ${className}`} onClick={onClick}>
      {!icon ? null : icon}
      <h5 className={isActive ? 'link-title link-title_active' : 'link-title'}>{title}</h5>
    </Link>
  );
};

export default NavLink;
