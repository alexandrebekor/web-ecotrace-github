import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { SignUpService } from '../sign-up.service'
import { GithubPrivateAccountsRepository } from '@/repositories/github-private/github-private-accounts.repository'

export const makeSignUpFactory = () => {
	const usersRepository = new PrismaUsersRepository()
	const accountsRepository = new GithubPrivateAccountsRepository()

	const service = new SignUpService(usersRepository, accountsRepository)

	return service
}