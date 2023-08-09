import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import Footer from '@/components/footer/Footer';

describe('Footer', () => {
  it('renders footer', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });
});
