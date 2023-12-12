import { GithubPrivateAccountsRepository } from '@/repositories/github-private/github-private-accounts.repository'
import { CreateSearchService } from '../create-search.service'
import { PrismaSearchesRepository } from '@/repositories/prisma/prisma-searches.repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'

export const makeCreateSearch = () => {
	const usersRepository = new PrismaUsersRepository()
	const accountsRepository = new GithubPrivateAccountsRepository()
	const searchesRepository = new PrismaSearchesRepository()
	const service = new CreateSearchService(usersRepository, searchesRepository, accountsRepository)

	return service
}