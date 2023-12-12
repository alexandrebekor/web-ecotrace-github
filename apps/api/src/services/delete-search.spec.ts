import { SearchesRepository } from '@/repositories/searches.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteSearchService } from './delete-search.service'
import { InMemorySearchesRepository } from '@/repositories/in-memory/in-memory-searches.repository'
import { randomUUID } from 'crypto'
import { ResourceNotFound } from './errors/resource-not-found.error'

let searchesRepository: SearchesRepository
let sut: DeleteSearchService

const userId = 'user-id'
const username = 'nickname'

describe('Delete Search', () => {
	beforeEach(() => {
		searchesRepository = new InMemorySearchesRepository()
		sut = new DeleteSearchService(searchesRepository)
	})

	it('should not be able to delete if search is not exists', async () => {
		await expect(() => sut.execute({
			searchId: randomUUID()
		})).rejects.toBeInstanceOf(ResourceNotFound)
	})

	it('should be able to delete search', async () => {
		const searchCreate = await searchesRepository.create({
			userId,
			username,
		})

		const { search } = await sut.execute({
			searchId: searchCreate.id
		})

		expect(search.userId).toEqual(userId)
	})
})