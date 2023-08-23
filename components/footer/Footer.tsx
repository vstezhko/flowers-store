import React from 'react';
import { MenuParams } from '@/components/header/Header';
import PhoneIcon from '@/components/Icons/PhoneIcon';
import NavLink from '@/components/nav/NavLink';
import ContactForm from '@/components/form/contactForm/ContactForm';

export type MenuParamsWithoutPathName = Pick<MenuParams, 'id' | 'path' | 'title' | 'icon'>;

const menuItems: MenuParamsWithoutPathName[] = [
  { id: 1, path: '/info/offer', title: 'Offer', icon: null },
  { id: 2, path: '/info/order', title: 'Order Placement', icon: null },
  { id: 3, path: '/info/faq', title: 'Questions and Answers', icon: null },
  { id: 4, path: '/info/delivery', title: 'Delivery and Payment Methods', icon: null },
];

const getCurrentYear = () => {
  return new Date().getFullYear();
};
const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-menu__container container'>
        <div className='footer-menu__item layout-2-columns'>
          <div className='menu__item'>
            <h4>Contact Information</h4>
            <div className='info__block-container'>
              <div className='info__block'>
                <p>
                  <span>Address:</span>
                </p>
                <p>Warsaw, Pola Karolinskie 2a</p>
              </div>
              <div className='info__block info__block_phone'>
                <PhoneIcon />
                <a className='phone' href='tel:+48573888888'>
                  + 48 573 888 888
                </a>
              </div>
              <div className='info__block info__block_phone'>
                <PhoneIcon />
                <a className='phone' href='tel:+48573888888'>
                  + 48 573 888 888
                </a>
              </div>
              <div className='info__block'>
                <p>
                  <span>Shop hours:</span>
                </p>
                <p>
                  Mon-Sat from <span>8 am</span> to <span>10 pm</span>
                </p>
              </div>
            </div>
          </div>
          <div className='menu__item'>
            <h4>For Clients</h4>
            <div className='info__block'>
              {menuItems.map(link => (
                <NavLink
                  key={link.id}
                  path={link.path}
                  title={link.title}
                  icon={link.icon}
                  pathName=''
                  className='footer-link'
                />
              ))}
            </div>
          </div>
        </div>
        <div className='footer-menu__item menu__form'>
          <h4>Any questions? Contact us</h4>
          <ContactForm />
        </div>
      </div>
      <div className='footer__date'>© {getCurrentYear()} Flowers store</div>
    </footer>
  );
};

export default Footer;
