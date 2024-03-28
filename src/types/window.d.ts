export {}

declare global {
  interface Window {
    sm2Decrypt: (text: string) => string
    sm2Encrypt: (text: string) => string
    sm4Decrypt: (text: string) => string
    sm4Encrypt: (text: string) => string
  }
}
