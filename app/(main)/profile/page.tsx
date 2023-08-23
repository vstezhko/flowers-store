'use client';
// import { useDispatch } from 'react-redux';
// import { loginSlice } from '@/redux/slices/loginSlice/loginSlice';
// import { TokenService } from '@/api/services/Token.service';
// import { useSnackbar } from 'notistack';
import { data } from '@/data/data';
import ProfileFormContainer from '@/components/form/ProfileFormContainer';
import ProfileComponent from '@/components/profile/ProfileComponent';

const Profile = () => {
  // const dispatch = useDispatch();
  // const { enqueueSnackbar } = useSnackbar();

  // const handleLogout = () => {
  //   TokenService.removeTokensFromLS();
  //   dispatch(loginSlice.actions.setIsLogin(false));
  //   dispatch(loginSlice.actions.setIsSignUp(false));
  //   dispatch(loginSlice.actions.removeCustomer());
  //   enqueueSnackbar('Successful logout', { variant: 'success' });
  // };

  return (
    <section className='page'>
      <h1 className='page__title'>Profile</h1>
      <ProfileFormContainer childComponent={ProfileComponent} data={data} />
    </section>
  );
};

export default Profile;
