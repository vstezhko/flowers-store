import NavLink from '@/components/nav/NavLink';
import { usePathname } from 'next/navigation';
import React from 'react';
import { MenuParamsWithoutPathName } from '@/components/header/Header';
import LeafRight from '@/public/img/png/leaf-right.png';

interface MobileMenuProps {
  menuItems: MenuParamsWithoutPathName[];
  isOpen: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ menuItems, isOpen }) => {
  const pathname = usePathname();

  return (
    <div className={`nav__mobile-container ${isOpen ? 'open' : ''}`}>
      <div className='nav__mobile-links'>
        {menuItems
          .filter(item => item.mobile === true)
          .map(({ id, path, title, icon, className }) => (
            <NavLink path={path} key={id} title={title} pathName={pathname} icon={icon} className={className} />
          ))}
      </div>
      <img src={LeafRight.src} alt='leaf' />
    </div>
  );
};

export default MobileMenu;
