'use server'

import { auth } from '@/auth'
import { FetchAdapter } from '@/adapters/fetch.adapter'
import { getSearchInput } from '@/components/Form/GetSearch'
import { sanitizeText } from '@/utils/format-text'
import { redirect } from 'next/navigation'

export const getSearchAction = async ({ username }: getSearchInput) => {
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
			const response = await api.post('/api/searches', { username: formattedSearch }, session.token)
			const { message } = await response.json()

			return {
				error: message
			}
		}
    
	} catch (error) {
		if(error instanceof Error) {
			return {
				error: error.message
			}
		}
    
		throw error
	}

	redirect(`/admin/${formattedSearch}`)
}