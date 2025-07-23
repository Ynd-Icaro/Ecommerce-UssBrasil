import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth.config"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      role: string
    }
  }

  interface User {
    role: string
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
