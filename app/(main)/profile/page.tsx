'use client';
import { useDispatch } from 'react-redux';
import { loginSlice } from '@/redux/slices/loginSlice/loginSlice';
import { TokenService } from '@/api/services/Token.service';
import NavLink from '@/components/nav/NavLink';

const Profile = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    TokenService.removeTokensFromLS();
    dispatch(loginSlice.actions.setIsLogin(false));
    dispatch(loginSlice.actions.removeCustomer());
  };

  return (
    <section>
      <p>Profile</p>
      <NavLink title='Log out' pathName='' path='/' icon={null} className='' onClick={handleLogout} />
    </section>
  );
};

export default Profile;
