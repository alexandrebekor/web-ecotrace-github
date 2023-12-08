import { Account, Repositories } from '@/types/accounts'

export type AccountsRepository = {
	findByUsername(username: string): Promise<Account | null>
	getRepositories(username: string): Promise<Repositories | null>
}