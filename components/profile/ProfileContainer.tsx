import React from 'react';
import FsTabs from '@/components/UI/FsTabs';
import { FormGroups } from '@/types/enums';
import ProfileFormContainer from '@/components/form/ProfileFormContainer';
import profileImage from '@/public/img/jpeg/address2.jpeg';
import addressBillingImage from '@/public/img/jpeg/address.jpeg';
import addressShippingImage from '@/public/img/jpeg/profile.webp';
import password from '@/public/img/jpeg/password.jpg';

const tabsName: string[] = ['Personal Info', 'Shipping Address', 'Billing Address', 'Password'];

const ProfileContainer = () => {
  interface ChildComponent {
    component: React.JSX.Element;
  }

  const children: ChildComponent[] = [
    {
      component: <ProfileFormContainer src={profileImage.src} type={FormGroups.CUSTOMER} />,
    },
    {
      component: <ProfileFormContainer src={addressShippingImage.src} type={FormGroups.SHIPPING_ADDRESS} />,
    },
    {
      component: <ProfileFormContainer src={addressBillingImage.src} type={FormGroups.BILLING_ADDRESS} />,
    },
    {
      component: <ProfileFormContainer src={password.src} type='password' />,
    },
  ];

  return (
    <div className='profile__container'>
      <FsTabs tabs={tabsName} components={children.map(child => child.component)} />
    </div>
  );
};

export default ProfileContainer;
