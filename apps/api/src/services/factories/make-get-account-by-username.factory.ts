import { GithubPrivateAccountsRepository } from '@/repositories/github-private/github-private-accounts.repository'
import { GetAccountByUsernameService } from '../get-account-by-username.service'

export const makeGetAccountByUsername = () => {
	const accountsRepository = new GithubPrivateAccountsRepository()
	const service = new GetAccountByUsernameService(accountsRepository)

	return service
}