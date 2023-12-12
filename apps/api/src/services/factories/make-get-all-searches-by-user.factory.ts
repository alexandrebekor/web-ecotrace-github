import { GetAllSearchesByUserService } from '../get-all-searches-by-user.service'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { PrismaSearchesRepository } from '@/repositories/prisma/prisma-searches.repository'

export const makeGetAllSearchesByUser = () => {
	const usersRepository = new PrismaUsersRepository()
	const searchesRepository = new PrismaSearchesRepository()
	const service = new GetAllSearchesByUserService(usersRepository, searchesRepository)

	return service
}