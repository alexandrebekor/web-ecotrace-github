'use server'

import { FetchAdapter } from '@/adapters/fetch.adapter'
import { auth } from '@/auth'
import { updateUserInput } from '@/components/Form/UpdateUser'
import { sanitizeText } from '@/utils/format-text'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const updateUserAction = async (data: updateUserInput) => {
	const session = await auth()

	if(!session || !session.token) {
		return {
			error: 'Not Authorized'
		}
	}

	if(data.username) {
		data = {
			...data,
			username: sanitizeText(data.username)
		}
	}

	try {
		const api = new FetchAdapter()
		const response = await api.put('/api/me', data, session.token)

		if(!response.ok) {
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

	revalidatePath('/admin')
	redirect('/admin')
}