import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test-utils/render';
import { UserProfileCard } from '../../components/UserProfileCard';
import type { IUserProfileData } from '../../types';

const mockProfile: IUserProfileData = {
  userId: '123',
  fullName: 'Amar Josh',
  email: 'amar@example.com',
  phone: '9876543210',
  pan: 'ABCDE1234F',
  aadhaar: '123456789012',
};

describe('UserProfileCard', () => {
  it('renders the full name as plain text', () => {
    renderWithProviders(<UserProfileCard profile={mockProfile} />);

    expect(screen.getByText('Amar Josh')).toBeDefined();
  });

  it('renders PII fields with masking (show/hide buttons present)', () => {
    renderWithProviders(<UserProfileCard profile={mockProfile} />);

    const showButtons = screen.getAllByRole('button', { name: /reveal/i });
    // email, phone, pan, aadhaar = 4 masked fields
    expect(showButtons.length).toBe(4);
  });

  it('does not render raw PAN or Aadhaar values', () => {
    renderWithProviders(<UserProfileCard profile={mockProfile} />);

    expect(screen.queryByText('ABCDE1234F')).toBeNull();
    expect(screen.queryByText('123456789012')).toBeNull();
  });
});
