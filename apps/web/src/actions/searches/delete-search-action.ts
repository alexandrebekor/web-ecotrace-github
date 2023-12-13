'use server'

import { FetchAdapter } from '@/adapters/fetch.adapter'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const deleteSearchAction = async ({ id }: { id: string }) => {
	const session = await auth()

	if(!session || !session.token) {
		return {
			error: 'Not Authorized'
		}
	}

	try {
		const api = new FetchAdapter()
		const response = await api.delete(`/api/searches/${id}`, session.token)

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
	}

	revalidatePath('/admin/searches')
}