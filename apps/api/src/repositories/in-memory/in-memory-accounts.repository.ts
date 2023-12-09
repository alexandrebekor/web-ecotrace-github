import { Account, Repositories } from '@/types/accounts'
import { AccountsRepository } from '../accounts.repository'

export class InMemoryAccountsRepository implements AccountsRepository {
	async findByUsername(username: string): Promise<Account | null> {
		return
	}

	async getRepositories(username: string): Promise<Repositories | null> {
		throw new Error('teste')
	}
}