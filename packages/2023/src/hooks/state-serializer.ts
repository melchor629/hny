import { Chacha20 } from 'ts-chacha20'
import { bytesToBase64, base64ToBytes } from 'byte-base64'

// prettier-ignore
const key = new Uint8Array([
  147, 212, 118, 179,  75, 131, 227, 206,  80, 202,  34,  76,  32,  16,  34,  98,
   73,  89, 196,  87, 209, 202, 231, 175, 243, 132,  23, 168,  88, 180, 233, 121,
])
// prettier-ignore
const nonce = new Uint8Array([
   16, 196, 251, 115, 154, 226, 225,  76, 125, 208, 119, 144,
])

const textEncoder = new TextEncoder()
const textDecoder = new TextDecoder('utf-8')

const serializer = Object.freeze({
  serialize<T>(object: T) {
    const json = JSON.stringify(object)
    const bytes = textEncoder.encode(json)
    const encrypted = new Chacha20(key, nonce).encrypt(bytes)
    const base64Encrypted = bytesToBase64(encrypted)
    return base64Encrypted
  },
  deserialize<T>(content: string) {
    const encrypted = base64ToBytes(content)
    const bytes = new Chacha20(key, nonce).decrypt(encrypted)
    const json = textDecoder.decode(bytes)
    const object: T = JSON.parse(json)
    return object
  },
})

// NOTE: this is not to prevent players to read the state, this is to make it difficult
//       only those who know, may be able to read and modify the state from the storage

export default serializer
