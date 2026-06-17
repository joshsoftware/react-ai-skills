import { generateAesKey, encryptAesGcm, decryptAesGcm } from './aesgcm';
import { encryptRsaOaep, decryptRsaOaep } from './rsaoaep';
import { arrayBufferToBase64, base64ToArrayBuffer } from './util';

export interface EnvelopeEncrypted {
  encryptedKey: string;
  ciphertext: string;
  iv: string;
}

export async function envelopeEncrypt(
  publicKey: CryptoKey,
  plaintext: string,
): Promise<EnvelopeEncrypted> {
  const aesKey = await generateAesKey();
  const { ciphertext, iv } = await encryptAesGcm(aesKey, plaintext);
  const rawKey = await crypto.subtle.exportKey('raw', aesKey);
  const encryptedKey = await encryptRsaOaep(
    publicKey,
    new TextDecoder().decode(new Uint8Array(rawKey)),
  );

  return {
    encryptedKey: arrayBufferToBase64(encryptedKey),
    ciphertext: arrayBufferToBase64(ciphertext),
    iv: arrayBufferToBase64(iv.buffer as ArrayBuffer),
  };
}

export async function envelopeDecrypt(
  privateKey: CryptoKey,
  envelope: EnvelopeEncrypted,
): Promise<string> {
  const rawKeyStr = await decryptRsaOaep(privateKey, base64ToArrayBuffer(envelope.encryptedKey));
  const rawKey = new TextEncoder().encode(rawKeyStr);
  const aesKey = await crypto.subtle.importKey('raw', rawKey, 'AES-GCM', false, ['decrypt']);
  const ciphertext = base64ToArrayBuffer(envelope.ciphertext);
  const iv = new Uint8Array(base64ToArrayBuffer(envelope.iv));
  return decryptAesGcm(aesKey, ciphertext, iv);
}
