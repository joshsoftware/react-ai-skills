export async function generateAesKey(): Promise<CryptoKey> {
  return crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
}

export async function encryptAesGcm(
  key: CryptoKey,
  plaintext: string,
): Promise<{ ciphertext: ArrayBuffer; iv: Uint8Array }> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plaintext);
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
  return { ciphertext, iv };
}

export async function decryptAesGcm(
  key: CryptoKey,
  ciphertext: ArrayBuffer,
  iv: Uint8Array,
): Promise<string> {
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);
  return new TextDecoder().decode(decrypted);
}
