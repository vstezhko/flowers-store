import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import HeaderCart, { HeaderCartParams } from '@/components/header/HeaderCart';

test('renders cart sum correctly', () => {
  const sum = '100.00';
  const invisible = true;
  const quantity = 3;
  const props: HeaderCartParams = { sum, invisible, quantity };
  render(<HeaderCart {...props} />);
  const sumElement = screen.getByText(`$ ${sum}`);
  expect(sumElement).toBeInTheDocument();
});
