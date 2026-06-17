export type MaskerType = 'pan' | 'aadhaar' | 'account' | 'mobile' | 'email' | 'custom';

const MASK_CHAR = '\u2022'; // bullet •

export function maskPan(value: string): string {
  if (value.length < 4) return MASK_CHAR.repeat(value.length);
  return value.slice(0, 2) + MASK_CHAR.repeat(value.length - 4) + value.slice(-2);
}

export function maskAadhaar(value: string): string {
  if (value.length < 4) return MASK_CHAR.repeat(value.length);
  return MASK_CHAR.repeat(value.length - 4) + value.slice(-4);
}

export function maskAccount(value: string): string {
  if (value.length < 4) return MASK_CHAR.repeat(value.length);
  return MASK_CHAR.repeat(value.length - 4) + value.slice(-4);
}

export function maskMobile(value: string): string {
  if (value.length < 4) return MASK_CHAR.repeat(value.length);
  return MASK_CHAR.repeat(value.length - 4) + value.slice(-4);
}

export function maskEmail(value: string): string {
  const parts = value.split('@');
  const local = parts[0] ?? '';
  const domain = parts[1];
  if (!domain) return MASK_CHAR.repeat(value.length);
  const visibleLocal = local.length > 2 ? local.slice(0, 2) : local.slice(0, 1);
  return `${visibleLocal}${MASK_CHAR.repeat(Math.max(local.length - visibleLocal.length, 1))}@${domain}`;
}

export function mask(value: string, type: MaskerType): string {
  switch (type) {
    case 'pan':
      return maskPan(value);
    case 'aadhaar':
      return maskAadhaar(value);
    case 'account':
      return maskAccount(value);
    case 'mobile':
      return maskMobile(value);
    case 'email':
      return maskEmail(value);
    case 'custom':
      return MASK_CHAR.repeat(value.length);
  }
}
