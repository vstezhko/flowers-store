import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import HeaderCart, { HeaderCartParams } from '@/components/HeaderCart';

test('renders cart sum correctly', () => {
  const sum = '100.00';
  const props: HeaderCartParams = { sum };
  render(<HeaderCart {...props} />);
  const sumElement = screen.getByText(`$${sum}`);
  expect(sumElement).toBeInTheDocument();
});
