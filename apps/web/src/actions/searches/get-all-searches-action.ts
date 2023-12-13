'use server'

import { FetchAdapter } from '@/adapters/fetch.adapter'
import { auth } from '@/auth'

export const getAllSearchesAction = async () => {
	const session = await auth()

	if(!session || !session.token) {
		return {
			error: 'Not Authorized'
		}
	}
  
	try {
		const api = new FetchAdapter()
		const response = await api.get('/api/searches', session.token)
    
		if(!response.ok) {
			const { message } = await response.json()
			return {
				error: message
			}
		}

		const searches = await response.json()
		return searches
	} catch (error) {
		if(error instanceof Error) {
			return {
				error: error.message
			}
		}
	}
}