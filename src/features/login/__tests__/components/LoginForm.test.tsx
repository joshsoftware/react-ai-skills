import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../services', () => ({
  loginService: vi.fn(),
}));

import { renderWithProviders } from '@/test-utils/render';
import { loginService } from '../../services';
import { LoginForm } from '../../components/LoginForm';

const mockedLogin = vi.mocked(loginService);
beforeEach(() => vi.clearAllMocks());

describe('LoginForm', () => {
  it('submits valid credentials', async () => {
    const mockResponse = {
      statusCode: 200,
      status: 'success' as const,
      message: 'OK',
      data: {
        token: 'abc',
        refreshToken: 'def',
        userAttributes: { userId: '1', name: 'Admin', email: 'a@b.com', roles: [] },
      },
    };
    mockedLogin.mockResolvedValueOnce(mockResponse);
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(<LoginForm onSubmit={onSubmit} isPending={false} />);

    await user.type(screen.getByLabelText(/username/i), 'admin');
    await user.type(screen.getByLabelText(/password/i), 'secret');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({ username: 'admin', password: 'secret' }),
    );
  });

  it('shows validation errors for short username', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    renderWithProviders(<LoginForm onSubmit={onSubmit} isPending={false} />);

    await user.type(screen.getByLabelText(/username/i), 'ab');
    await user.type(screen.getByLabelText(/password/i), 'secret');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/at least 3 characters/i)).toBeDefined();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('disables submit button when pending', () => {
    renderWithProviders(<LoginForm onSubmit={vi.fn()} isPending={true} />);

    expect(screen.getByRole('button')).toBeDisabled();
  });
});
