import BulletIcon from '@/components/Icons/BulletIcon';
import PhoneIcon from '@/components/Icons/PhoneIcon';
import HeaderCart from '@/components/HeaderCart';
import NavMenu from '@/components/NavMenu';

const Header = () => {
  return (
    <header className='header'>
      <div className='header-menu'>
        <div className='header-menu__container container'>
          <div className='header-menu__address'>
            <BulletIcon />
            <p>
              <span>Warsaw,</span> Pola Karolinskie 2a
            </p>
          </div>
          <div className='header-menu__phone'>
            <PhoneIcon />
            <div className='phone__container'>
              <p>WhatsApp</p>
              <a className='phone' href='tel:+78083535335'>
                + 7 808 353 53 35
              </a>
            </div>

            <a className='phone' href='tel:+78083535335'>
              + 7 808 353 53 35
            </a>
          </div>
          <HeaderCart sum='0' />
        </div>
      </div>
      <NavMenu />
    </header>
  );
};

export default Header;
