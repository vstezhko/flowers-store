import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import FeaturesSection from '@/components/FeaturesSection';

describe('FeaturesSection component', () => {
  it('renders all features with valid alt attributes', () => {
    const { getAllByAltText } = render(<FeaturesSection />);
    const images  = getAllByAltText(/./);

    images.forEach((image) => {
      if (!(image instanceof HTMLImageElement)) {
        throw new Error();
      }
      expect(image).toHaveAttribute('alt');
      expect(image.alt).not.toBe('');
    });
  });
});
