import { render, screen } from '@testing-library/react';
import Home from '../app/page';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('renders main', () => {
    render(<Home />);

    const main = screen.getByRole('main', {
      name: '',
    });

    expect(main).toBeInTheDocument();
  });
});
