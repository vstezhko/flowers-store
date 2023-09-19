import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import HeaderCart, { HeaderCartParams } from '@/components/header/HeaderCart';

test('renders cart sum correctly', () => {
  const sum = '100.00';
  const invisible = true;
  const quantity = 3;
  const loading = false;
  const props: HeaderCartParams = { sum, invisible, quantity, loading };
  render(<HeaderCart {...props} />);
  const sumElement = screen.getByText(`${sum} EUR`);
  expect(sumElement).toBeInTheDocument();
});
