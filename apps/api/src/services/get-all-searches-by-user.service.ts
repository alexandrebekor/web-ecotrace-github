import { UsersRepository } from '@/repositories/users.repository'
import { Search } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found.error'
import { SearchesRepository } from '@/repositories/searches.repository'

type GetAllSearchesByUserServiceRequest = {
  userId: string
}

type GetAllSearchesByUserServiceResponse = {
  searches: Search[]
}

export class GetAllSearchesByUserService {
	constructor(readonly usersRepository: UsersRepository, readonly searchesRepository: SearchesRepository) {}

	async execute ({ userId }: GetAllSearchesByUserServiceRequest): Promise<GetAllSearchesByUserServiceResponse> {
		const user = await this.usersRepository.findById(userId)

		if(!user) {
			throw new ResourceNotFound()
		}

		const searches = await this.searchesRepository.getAllSearchesByUser(userId)
    
		if(!searches) {
			throw new ResourceNotFound()
		}

		return {
			searches
		}
	}
}