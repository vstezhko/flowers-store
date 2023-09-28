'use client';

import { Provider } from 'react-redux';
import { reduxStore } from '@/redux/store';
import React from 'react';

export const Providers = (props: React.PropsWithChildren) => {
  return <Provider store={reduxStore}>{props.children}</Provider>;
};
