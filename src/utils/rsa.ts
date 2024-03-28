// @ts-ignore
import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey: string =
  'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKXnzkH+ywA9auWTKnaEcyBc4Ab3KrZu\n' +
  'lEfemDnE7FS1YnisRY29YypO9ayo/ZRevVnV27iD0b/lMPy4TK8wnAkCAwEAAQ=='

const privateKey: string =
  'MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEApefOQf7LAD1q5ZMq\n' +
  'doRzIFzgBvcqtm6UR96YOcTsVLVieKxFjb1jKk71rKj9lF69WdXbuIPRv+Uw/LhM\n' +
  'rzCcCQIDAQABAkEAlAVF2UvjAsvJXBr5f9ScgvtaRdywlyQB2D2Zw7EWylu6z6B+\n' +
  'qgabzQM6rZ4b4cBCSUBn4cClA6I+glqZ6AfToQIhANjObRy93sTGF+0cj6oL4oa+\n' +
  'd6qijDpRNPVu07gmVfprAiEAw+W9gNHO1PHuf1R7fuUk4KXvDSzoC7KbEWYQcsI3\n' +
  'yFsCIBDXgExiR4LbrJIjzNk10SQMeblMpT4Gfumt8U510+n/AiByv79qlvuV5wVy\n' +
  'VpVkdmtMoEZQLG7cc0m8PlICNtwgIwIhAKvYUOV2Z0G0arJMsWC5rky6Gy4/7cNE\n' +
  '8Yd7mH6QHYU2'

/**
 * RAS加密
 * @param {string} txt
 * @returns {string}
 */
export function rsaEncrypt(txt: string): string {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey)
  return encryptor.encrypt(txt)
}

/**
 * RSA解密
 * @param {string} txt
 * @returns {string}
 */
export function rsaDecrypt(txt: string): string {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey)
  return encryptor.decrypt(txt)
}
