'use server'

import { FetchAdapter } from '@/adapters/fetch.adapter'
import { signIn } from '@/auth'
import { signUpInput } from '@/components/Form/SignUp'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'

export const signUpAction = async (data: signUpInput) => {
	try {
		const api = new FetchAdapter()
		const response = await api.post('/api/register', data)

		if(!response.ok) {
			const { message } = await response.json()
			return {
				error: message
			}
		}

		await signIn('credentials', {
			email: data.email,
			password: data.password,
			redirect: false
		})

	} catch (error) {
		if(error instanceof AuthError) {
			return {
				error: error.message
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