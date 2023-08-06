import React from 'react';
import { MenuParams } from '@/components/Header';
import NavMenu from '@/components/NavMenu';
// import PhoneIcon from '@/components/Icons/PhoneIcon';

export type MenuParamsWithoutPathName = Pick<MenuParams, 'id' | 'path' | 'title' | 'icon'>;

const menuItems: MenuParamsWithoutPathName[] = [
  { id: 1, path: '/catalog', title: 'Catalog', icon: null },
  { id: 2, path: '/discounts', title: 'Discounts', icon: null },
  { id: 3, path: '/reviews', title: 'Reviews', icon: null },
  { id: 4, path: '/contacts', title: 'Contacts', icon: null },
  { id: 6, path: '/offer', title: 'Offer', icon: null },
  { id: 5, path: '/info', title: 'Info for clients', icon: null },
];

const getCurrentYear = () => {
  return new Date().getFullYear();
};
const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-nav'>
        <NavMenu menuItems={menuItems} currency={false} />
      </div>
      <div className='footer-menu'>
        <div className='footer-menu__container container'>
          <div className='footer-menu__item menu__info'>
            <h3>Contact Information</h3>
            {/*<p>Address</p>*/}
            {/*<div className='menu__info-phone'>*/}
            {/*  <PhoneIcon />*/}
            {/*  <a className='phone' href='tel:+78083535335'>*/}
            {/*    + 7 808 353 53 35*/}
            {/*  </a>*/}
            {/*</div>*/}
            {/*<p>Shop hours: Mon-Sat from 8 am to 10 pm</p>*/}
          </div>
          <div className='footer-menu__item menu__clients'>
            <h3>For Clients</h3>
          </div>
          <div className='footer-menu__item menu__form'>
            <h3>Any questions? Contact us</h3>
          </div>
        </div>
        <span className='line'></span>
        <div className='footer__date'>© {getCurrentYear()} Flowers store</div>
      </div>
    </footer>
  );
};

export default Footer;
