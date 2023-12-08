import { UserGithub } from '@/types/Github'
import { AccountsRepository } from '../accounts.repository'

export class GithubRepository implements AccountsRepository {
	private base_url = 'https://api.github.com'

	async findByUsername(username: string): Promise<UserGithub> {
		try {
			const response = await fetch(`${this.base_url}/users/${username}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if(!response.ok) {
				throw new Error('Error API')
			}

			const user = await response.json()
			return user
		} catch (error) {
			console.log(error)
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
				throw new Error('Error API')
			}

			const repositories = await response.json()
			return repositories
		} catch (error) {
			throw new Error('Internal Error')
		}
	}
}