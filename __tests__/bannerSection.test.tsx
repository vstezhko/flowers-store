import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BannerSection from '@/components/BannerSection';

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
