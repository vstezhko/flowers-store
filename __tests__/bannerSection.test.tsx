import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BannerSection from '@/components/main/BannerSection';

import type * as ReactDom from 'react-dom';

jest.mock('react-dom', () => ({
  ...jest.requireActual<typeof ReactDom>('react-dom'),
  preload: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

test('the banner image is displayed correctly', () => {
  render(<BannerSection />);
  const bannerImage = screen.getByAltText('Welcome');

  expect(bannerImage).toBeInTheDocument();
  expect(bannerImage).toBeVisible();
});
