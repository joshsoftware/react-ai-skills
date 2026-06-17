import { PII_PATTERNS } from './patterns';

export function isValidPan(value: string): boolean {
  return PII_PATTERNS.pan.test(value);
}

export function isValidAadhaar(value: string): boolean {
  return PII_PATTERNS.aadhaar.test(value.replace(/\s/g, ''));
}

export function isValidAccountNumber(value: string): boolean {
  return PII_PATTERNS.accountNumber.test(value);
}

export function isValidMobileIN(value: string): boolean {
  return PII_PATTERNS.mobileIndia.test(value);
}

export function isValidIfsc(value: string): boolean {
  return PII_PATTERNS.ifsc.test(value);
}

export function isValidPincode(value: string): boolean {
  return PII_PATTERNS.pincodeIndia.test(value);
}

export function isValidUpiVpa(value: string): boolean {
  return PII_PATTERNS.upiVpa.test(value);
}
