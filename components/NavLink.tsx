import React from 'react';
import Link from 'next/link';
import { MenuParams } from '@/components/NavMenu';

type MenuParamsWithoutId = Pick<MenuParams, 'pathName' | 'path' | 'title' | 'icon'>;

const NavLink: React.FC<MenuParamsWithoutId> = ({ title = '', path = '', pathName = '', icon }) => {
  return (
    <Link href={path} className='header-nav__link'>
      {!icon ? null : icon}
      <h5 className={pathName.includes(path) ? 'link-title link-title_active' : 'link-title'}>{title}</h5>
    </Link>
  );
};

export default NavLink;
