export async function generateRsaKeyPair(): Promise<CryptoKeyPair> {
  return crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true,
    ['encrypt', 'decrypt'],
  );
}

export async function encryptRsaOaep(
  publicKey: CryptoKey,
  plaintext: string,
): Promise<ArrayBuffer> {
  const encoded = new TextEncoder().encode(plaintext);
  return crypto.subtle.encrypt({ name: 'RSA-OAEP' }, publicKey, encoded);
}

export async function decryptRsaOaep(
  privateKey: CryptoKey,
  ciphertext: ArrayBuffer,
): Promise<string> {
  const decrypted = await crypto.subtle.decrypt({ name: 'RSA-OAEP' }, privateKey, ciphertext);
  return new TextDecoder().decode(decrypted);
}
