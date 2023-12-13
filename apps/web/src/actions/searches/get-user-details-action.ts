'use server'

import { auth } from '@/auth'
import { FetchAdapter } from '@/adapters/fetch.adapter'
import { sanitizeText } from '@/utils/format-text'

export const getUserDetailsAction = async ({ username }: { username: string}) => {
	const session = await auth()

	if(!session || !session.token) {
		return {
			error: 'Not Authorized'
		}
	}
  
	const formattedSearch = sanitizeText(username)

	try {
		const api = new FetchAdapter()
		const response = await api.get(`/api/account/${formattedSearch}`, session.token)
		
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