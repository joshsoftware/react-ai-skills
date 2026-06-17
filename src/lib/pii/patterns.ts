export const PII_PATTERNS = {
  // Identity
  pan: /^[A-Z]{5}\d{4}[A-Z]$/,
  aadhaar: /^\d{12}$/,
  passport: /^[A-Z]\d{7}$/,
  voterID: /^[A-Z]{3}\d{7}$/,
  drivingLicence: /^[A-Z]{2}\d{2} ?\d{4} ?\d{7}$/,

  // Contact
  mobileIndia: /^[6-9]\d{9}$/,
  pincodeIndia: /^\d{6}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  // Banking
  accountNumber: /^\d{9,18}$/,
  ifsc: /^[A-Z]{4}0[A-Z0-9]{6}$/,
  micr: /^\d{9}$/,
  upiVpa: /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/,
  swiftBic: /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/,
  gstin: /^\d{2}[A-Z]{5}\d{4}[A-Z][A-Z\d]Z[A-Z\d]$/,
} as const;
