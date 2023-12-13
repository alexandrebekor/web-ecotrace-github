import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { FetchAdapter } from './adapters/fetch.adapter'

export const { handlers, auth, signIn, signOut } = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			async authorize(credentials) {
				const schema = z.object({
					email: z.string().email(),
					password: z.string()
				})

				const signIn = schema.safeParse(credentials)

				if(signIn.success) {
					const { email, password } = signIn.data

					const api = new FetchAdapter()
					const response = await api.post('/api/auth', {
						email,
						password
					})

					if(response.ok) {
						const user = await response.json()
						return user
					}

					return null
				}

				return null
			},
		}),
	]
})