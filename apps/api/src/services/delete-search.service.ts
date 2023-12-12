import { SearchesRepository } from '@/repositories/searches.repository'
import { Search } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found.error'

type DeleteSearchServiceRequest = {
  searchId: string
}

type DeleteSearchServiceResponse = {
  search: Search
}

export class DeleteSearchService {
	constructor(readonly searchesRepository: SearchesRepository) {}

	async execute({ searchId }: DeleteSearchServiceRequest): Promise<DeleteSearchServiceResponse> {
		const search = await this.searchesRepository.delete(searchId)

		if(!search) {
			throw new ResourceNotFound()
		}

		return {
			search
		}
	}
}