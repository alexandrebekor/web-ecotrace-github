'use server'

import { FetchAdapter } from '@/adapters/fetch.adapter'
import { auth } from '@/auth'

export const getCurrentUserAction = async () => {
	const session = await auth()

	if(!session || !session.token) {
		return {
			error: 'Not Authorized'
		}
	}

	try {
		const api = new FetchAdapter()
		const response = await api.get('/api/me', session.token)

		if(!response.ok) {
			const { message } = await response.json()
			return {
				error: message
			}
		}

		const user = await response.json()
		return user
	} catch (error) {
		if(error instanceof Error) {
			return {
				error: error.message
			}
		}

		throw error
	}
}