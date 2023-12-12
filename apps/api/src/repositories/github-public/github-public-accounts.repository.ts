import { AccountsRepository } from '../accounts.repository'

export class GithubPublicAccountsRepository implements AccountsRepository {
	private base_url = 'https://api.github.com'

	async getByUsername(username: string) {
		try {
			const response = await fetch(`${this.base_url}/users/${username}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if(!response.ok) {				
				return null
			}

			const user = await response.json()
			return user
		} catch (error) {
			return null
		}
	}
  
	async getAllRepositoriesByUsername(username: string) {
		try {
			const response = await fetch(`${this.base_url}/users/${username}/repos`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if(!response.ok) {
				return null
			}

			const repositories = await response.json()
			return repositories
		} catch (error) {
			return null
		}
	}
}