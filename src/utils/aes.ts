import CryptoJS from 'crypto-js'

const key = CryptoJS.enc.Utf8.parse('12345678abcdefgh')
const iv = CryptoJS.enc.Utf8.parse('')

/**
 * AES加密
 * @param {string} text
 * @returns {string}
 */
export function aesEncrypt(text: string): string {
  const srcs = CryptoJS.enc.Utf8.parse(text)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}

/**
 * AES解密
 * @param {string} text
 * @returns {string}
 */
export function aesDecrypt(text: string): string {
  const base64 = CryptoJS.enc.Base64.parse(text)
  const src = CryptoJS.enc.Base64.stringify(base64)
  const decrypt = CryptoJS.AES.decrypt(src, key, {
    iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return CryptoJS.enc.Utf8.stringify(decrypt)
}
