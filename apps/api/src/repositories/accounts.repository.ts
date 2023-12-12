import { Account, Repositories } from '@/@types/accounts'

export type AccountsRepository = {
	getByUsername(username: string): Promise<Account | null>
	getAllRepositoriesByUsername(username: string): Promise<Repositories | null>
}