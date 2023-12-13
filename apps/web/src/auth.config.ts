import type { NextAuthConfig } from 'next-auth'
import { env } from './lib/env'
import { NextResponse } from 'next/server'
 
export const authConfig = {
	pages: {
		signIn: '/',
		signOut: '/'
	},
	session: {
		strategy: 'jwt'
	},
	secret: env.AUTH_TOKEN,
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user
			const isOnDashboard = nextUrl.pathname.startsWith('/admin')

			if (isOnDashboard) {
				if (isLoggedIn) return true
				return NextResponse.redirect(new URL('/', nextUrl))
			} else if (isLoggedIn) {
				return NextResponse.redirect(new URL('/admin', nextUrl))
			}
      
			return true
		},
		async jwt({ user, token }) {
			if(user) {
				return {
					...token,
					access_token: user.token,
					username: user.username
				}
			}

			return token
		},
		async session({ session, token }) {
			if(token) {
				session.token = token.access_token
				session.username = token.username
			}

			return session
		},
	},
	providers: [],
} satisfies NextAuthConfig

declare module '@auth/core/types' {
  interface Session {
    token: string
		username: string
  }

  interface User {
    token: string
		username: string
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    access_token: string
		username: string
  }
}