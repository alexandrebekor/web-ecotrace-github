import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { SignInService } from '../sign-in.service'

export const makeSignInFactory = () => {
	const usersRepository = new PrismaUsersRepository()
	const service = new SignInService(usersRepository)

	return service
}