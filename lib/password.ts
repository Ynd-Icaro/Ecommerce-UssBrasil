// Utils for password hashing compatible with Edge Runtime
import { createHash } from 'crypto'

// Simple hash function for Edge Runtime compatibility
export function hashPassword(password: string): string {
  // Use crypto.createHash which is available in Edge Runtime
  return createHash('sha256').update(password + process.env.NEXTAUTH_SECRET).digest('hex')
}

export function verifyPassword(password: string, hashedPassword: string): boolean {
  const hash = hashPassword(password)
  return hash === hashedPassword
}

// Alternative implementation using Web Crypto API (preferred for Edge Runtime)
export async function hashPasswordWebCrypto(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + process.env.NEXTAUTH_SECRET)
  
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  
  return hashHex
}

export async function verifyPasswordWebCrypto(password: string, hashedPassword: string): Promise<boolean> {
  const hash = await hashPasswordWebCrypto(password)
  return hash === hashedPassword
}
