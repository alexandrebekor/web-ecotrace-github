import { GithubPrivateAccountsRepository } from '@/repositories/github-private/github-private-accounts.repository'
import { GetAllRepositoriesService } from '../get-all-repositories.service'

export const makeGetAllRepositories = () => {
	const accountsRepository = new GithubPrivateAccountsRepository()
	const service = new GetAllRepositoriesService(accountsRepository)

	return service
}