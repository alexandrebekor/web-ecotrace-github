'use server'

import { FetchAdapter } from '@/adapters/fetch.adapter'
import { auth } from '@/auth'

export const createSearchAction = async ({ username }: { username: string}) => {
	const session = await auth()

	if(!session || !session.token) {
		return {
			error: 'Not Authorized'
		}
	}

	try {
		const api = new FetchAdapter()
		const response = await api.post('/api/searches', {
			username
		}, session.token)

		if(!response.ok) {
			const { message } = await response.json()
			return {
				error: message
			}
		}

		const search = await response.json()
		return search
	} catch (error) {
		if(error instanceof Error) {
			return {
				error: error.message
			}
		}

		throw error
	}
}