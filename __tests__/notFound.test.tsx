import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import NotFound from '@/app/not-found';
import { AppRouterContextProviderMock } from '@/__mocks__/next/router';

describe('not found', () => {
  it('should redirect to home page', () => {
    const push = jest.fn();

    render(
      <AppRouterContextProviderMock router={{ push }}>
        <NotFound />
      </AppRouterContextProviderMock>
    );

    const homeButton = screen.getByText('Home');

    fireEvent.click(homeButton);

    expect(push).toHaveBeenCalledWith('/');
  });
});
