import { env } from '@/lib/env'

export class FetchAdapter implements Adapter {
	async get(path: string, token?: string, init?: RequestInit) {
		const url = new URL(path, env.BASE_API_URL)

		let headers
		if(token) {
			headers = {
				'Content-type': 'application/json',	
				'Authorization': `Bearer ${token}`
			}
		} else {
			headers = {
				'Content-type': 'application/json',	
			}
		}
		
		return fetch(url, {
			method: 'GET',
			headers,
			...init
		})
	}

	async post(path: string, data: any, token?: string, init?: RequestInit) {
		const url = new URL(path, env.BASE_API_URL)

		let headers
		if(token) {
			headers = {
				'Content-type': 'application/json',	
				'Authorization': `Bearer ${token}`
			}
		} else {
			headers = {
				'Content-type': 'application/json',	
			}
		}

		return fetch(url, {
			method: 'POST',
			headers,
			body: JSON.stringify(data),
			...init
		})
	}

	async put(path: string, data: any, token?: string, init?: RequestInit) {
		const url = new URL(path, env.BASE_API_URL)

		let headers
		if(token) {
			headers = {
				'Content-type': 'application/json',	
				'Authorization': `Bearer ${token}`
			}
		} else {
			headers = {
				'Content-type': 'application/json',	
			}
		}

		return fetch(url, {
			method: 'PUT',
			headers,
			body: JSON.stringify(data),
			...init
		})
	}

	async delete(path: string, token?: string, init?: RequestInit) {
		const url = new URL(path, env.BASE_API_URL)

		let headers
		if(token) {
			headers = {
				'Content-type': 'application/json',	
				'Authorization': `Bearer ${token}`
			}
		} else {
			headers = {
				'Content-type': 'application/json',	
			}
		}

		return fetch(url, {
			method: 'DELETE',
			headers,
			...init
		})
	}
}