import { Account, Repositories } from '@/@types/accounts'
import { AccountsRepository } from '../accounts.repository'
import { octokit } from '@/lib/github'

export class GithubPrivateAccountsRepository implements AccountsRepository{
	async findByUsername(username: string): Promise<Account | null> {
		try {
			const { data : user } = await octokit.request('GET /users/{username}', {
				username
			})

			return user
		} catch (error) {
			return null
		}
	}

	async getRepositories(username: string): Promise<Repositories | null> {
		try {
			const { data : repositories} = await octokit.request('GET /users/{username}/repos', {
				username,
			})
	
			return repositories
		} catch (error) {
			return null
		}
	}
}