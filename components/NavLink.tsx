import React from 'react';
import Link from 'next/link';

const NavLink = ({ title = '', path = '', pathName = '' }) => {
  return (
    <Link href={path}>
      <h5 className={pathName.includes(path) ? 'nav-title nav-title_active' : 'nav-title'}>{title}</h5>
    </Link>
  );
};

export default NavLink;
