import { GithubPrivateAccountsRepository } from '@/repositories/github-private/github-private-accounts.repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { UpdateUserService } from '../update-user.service'

export const makeUpdateUserFactory = () => {
	const usersRepository = new PrismaUsersRepository()
	const accountsRepository = new GithubPrivateAccountsRepository()
	const service = new UpdateUserService(usersRepository, accountsRepository)

	return service
}