import { PrismaSearchesRepository } from '@/repositories/prisma/prisma-searches.repository'
import { DeleteSearchService } from '../delete-search.service'

export const makeDeleteSearch = () => {
	const searchesRepository = new PrismaSearchesRepository()
	const service = new DeleteSearchService(searchesRepository)

	return service
}