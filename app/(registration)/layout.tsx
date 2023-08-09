import React from 'react';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <div className='auth-page'>{children}</div>;
}
