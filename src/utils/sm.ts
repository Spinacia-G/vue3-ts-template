import { SM4 } from 'gm-crypto'
import { sm2 } from 'sm-crypto-v2'

// sm2公钥
const publicKey: string =
  '040174b19c5799f2512b0151237c271dfee9a4330be143d282f778087b351cc05c2d100087c9a5177b97c990424315c568fdc3db80fba873383183c7b3e038ffcd'

// sm2私钥
const privateKey: string =
  '3de823b082f0cf9a1b2b3e5f3e022d10ddff41ab3acb5d67e419ea209a69e22d'

// sm4密钥 十六进制形式 (如果是ASCII需要转换)
const sm4key: string = '0123456789abcdeffedcba9876543210'

const style =
  'background: linear-gradient(120deg, #fdcece99, rgba(0, 0, 0, 0) 60%),\n' +
  'linear-gradient(210deg, #ccf0fd99, rgba(0, 0, 0, 0) 60%),\n' +
  'linear-gradient(300deg, #ddcbfc99, rgba(0, 0, 0, 0) 60%),\n' +
  'linear-gradient(30deg, #fcf5cb99, rgba(0, 0, 0, 0) 60%);\n' +
  'padding: 2px 10px; color: #8d5252; border-radius: 5px; overflow: hidden;\n' +
  'text-shadow: 0 0 5px #fff;'

/**
 * sm2解密
 * @param {string} text 密文
 * @returns {string} 解密后的明文
 */
export const sm2Decrypt = (text: string): string => {
  if (!text) return ''
  try {
    return sm2.doDecrypt(text, privateKey, 1) as any as string
  } catch {
    console.log(`%c密文 ${text} 使用sm2解析失败！`, style)
    return ''
  }
}

/**
 * sm2加密
 * @param {string} text 明文
 * @returns {string} 加密后的密文
 */
export const sm2Encrypt = (text: string): string => {
  if (!text) return ''
  try {
    const encoder = new TextEncoder()
    return sm2.doEncrypt(encoder.encode(text), publicKey, 1, { asn1: false })
  } catch {
    console.log(`%c明文 ${text} 使用sm2加密失败！`, style)
    return ''
  }
}

/**
 * sm4解密
 * @param {string} text 密文
 * @returns {string} 解密后的明文
 */
export const sm4Decrypt = (text: string): string => {
  if (!text) return ''
  try {
    return SM4.decrypt(text, sm4key, {
      inputEncoding: 'base64',
      outputEncoding: 'utf8'
    })
  } catch {
    console.log(`%c密文 ${text} 使用sm4解析失败！`, style)
    return ''
  }
}

/**
 * sm4加密
 * @param {string} text 明文
 * @returns {string} 加密后的密文
 */
export const sm4Encrypt = (text: string): string => {
  if (!text) return ''
  try {
    return SM4.encrypt(text, sm4key, {
      inputEncoding: 'utf8',
      outputEncoding: 'base64'
    })
  } catch {
    console.log(`%c明文 ${text} 使用sm4加密失败！`, style)
    return ''
  }
}
