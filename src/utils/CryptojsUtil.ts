// Include CryptoJS library (make sure to include it in your project)
// You can download it from: https://cryptojs.gitbook.io/docs/
import CryptoJSUtil from "crypto-js";

// Encryption function
export function encrypt(text: string) {
  // Get the SALT from the system environment variable
  const SALT = process.env.SALT || "GodIsGod";
  const cipherText = CryptoJSUtil.AES.encrypt(text, SALT).toString();
  return cipherText;
}

// Decryption function
export function decrypt(cipherText: string) {
  // Get the SALT from the system environment variable
  const SALT = process.env.SALT || "GodIsGod";
  const bytes = CryptoJSUtil.AES.decrypt(cipherText, SALT);
  const originalText = bytes.toString(CryptoJSUtil.enc.Utf8);
  return originalText;
}
