import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import RootLayout from '@/app/layout';

describe('RootLayout', () => {
  it('renders children', () => {
    const children = { children: 'Some children' };
    const { getByText } = render(<RootLayout {...children} />);
    getByText('Flowers store');
  });
});
