import { render, screen } from '@testing-library/react';
import Home from '../app/page';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('renders div', () => {
    render(<Home />);
    const div = screen.getByText('Main');
    expect(div).toBeInTheDocument();
  });
});
