import { Account, Repositories } from '@/types/accounts'
import { AccountsRepository } from '../accounts.repository'
import { octokit } from '@/lib/github'
import { ApiNotResponding } from '@/services/errors/api-not-responding.error'

export class GithubPrivateAccountsRepository implements AccountsRepository{
	async findByUsername(username: string): Promise<Account | null> {
		try {
			const { data : user } = await octokit.request('GET /users/{username}', {
				username
			})
	
			if(!user) {
				return null
			}
	
			return user
		} catch (error) {
			throw new ApiNotResponding()
		}
	}

	async getRepositories(username: string): Promise<Repositories | null> {
		try {
			const { data: repositories} = await octokit.request('GET /users/{username}/repos', {
				username,
			})
	
			if(!repositories) {
				return null
			}
	
			return repositories
		} catch (error) {
			throw new ApiNotResponding()
		}
	}
}