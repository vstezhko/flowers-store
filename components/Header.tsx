import BulletIcon from '@/components/Icons/BulletIcon';
import PhoneIcon from '@/components/Icons/PhoneIcon';

const Header = () => {
  return (
    <header>
      <div className='header__menu'>
        <div className='header__menu-container container'>
          <div className='menu__address'>
            <BulletIcon />
            <p>
              <span>Warsaw,</span> Pola Karolinskie 2a
            </p>
          </div>
          <div className='menu__phone'>
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
          {/*TODO: add cart*/}
        </div>
      </div>
      {/*TODO: add navigation*/}
    </header>
  );
};

export default Header;
