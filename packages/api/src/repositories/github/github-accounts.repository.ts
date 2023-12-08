import { AccountsRepository } from '../accounts.repository'

export class GithubRepository implements AccountsRepository {
	private base_url = 'https://api.github.com'

	async findByUsername(username: string) {
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
			throw new Error('Internal Error')
		}
	}
  
	async getRepositories(username: string) {
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
			throw new Error('Internal Error')
		}
	}
}