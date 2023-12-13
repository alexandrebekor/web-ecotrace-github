'use server'

import { AuthError } from 'next-auth'
import { signIn } from '@/auth'
import { redirect } from 'next/navigation'
import { signInInput } from '@/components/Form/SignIn'

export const signInAction = async (data: signInInput) => {
	try {
		await signIn('credentials', {
			email: data.email,
			password: data.password,
			redirect: false,
		})
		
	} catch (error) {
		if(error instanceof AuthError) {
			if(error.type === 'CredentialsSignin') {
				return {
					error: 'Credentials invalid'
				}
			}

			return {
				error: 'Internal error'
			}
		}

		if(error instanceof Error) {
			return {
				error: error.message
			}
		}

		throw error
	}

	redirect('/admin')
}