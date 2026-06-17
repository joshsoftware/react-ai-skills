import { describe, it, expect } from 'vitest';
import { loginSchema } from '../utils';

describe('loginSchema', () => {
  it('accepts valid credentials', () => {
    const result = loginSchema.safeParse({ username: 'admin', password: 'secret' });
    expect(result.success).toBe(true);
  });

  it('rejects short username', () => {
    const result = loginSchema.safeParse({ username: 'ab', password: 'secret' });
    expect(result.success).toBe(false);
  });

  it('rejects empty password', () => {
    const result = loginSchema.safeParse({ username: 'admin', password: '' });
    expect(result.success).toBe(false);
  });

  it('trims password before validation', () => {
    const result = loginSchema.safeParse({ username: 'admin', password: '   ' });
    expect(result.success).toBe(false);
  });
});
