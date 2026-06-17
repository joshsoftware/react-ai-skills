export async function deriveKey(
  password: string,
  salt: Uint8Array,
  iterations = 600000,
): Promise<CryptoKey> {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveKey'],
  );

  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt'],
  );
}

export function generateSalt(length = 16): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(length));
}
