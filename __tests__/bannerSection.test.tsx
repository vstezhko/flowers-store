import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BannerSection from '@/components/BannerSection';

test('the banner image is displayed correctly', () => {
  render(<BannerSection />);
  const bannerImage = screen.getByAltText('Welcome');

  expect(bannerImage).toBeInTheDocument();
  expect(bannerImage).toBeVisible();
});
