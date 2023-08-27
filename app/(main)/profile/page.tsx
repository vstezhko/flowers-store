'use client';
import ProfileContainer from '@/components/profile/ProfileContainer';
import { useEffect } from 'react';
import { TokenService } from '@/api/services/Token.service';
import { TokenType } from '@/types/enums';
import { usePathname, useRouter } from 'next/navigation';

const Profile = () => {
  const currentPath = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isLogin = TokenService.getAccessTokenFromLS().type === TokenType.CUSTOMER;
    if (!isLogin && currentPath === '/profile') router.push('/login');
  }, [currentPath, router]);

  return (
    <section className='page'>
      <h1 className='page__title'>Profile</h1>
      <ProfileContainer />
    </section>
  );
};

export default Profile;
