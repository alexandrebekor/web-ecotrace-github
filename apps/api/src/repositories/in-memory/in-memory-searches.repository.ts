import { Prisma, Search } from '@prisma/client'
import { randomUUID } from 'crypto'
import { SearchesRepository } from '../searches.repository'

export class InMemorySearchesRepository implements SearchesRepository {
	private searches: Search[] = []

	async create(data: Prisma.SearchUncheckedCreateInput) {
		const search = {
			id: randomUUID(),
			username: data.username,
			userId: data.userId,
			repositories: data.repositories ?? null,
			updated_at: new Date(),
			created_at: new Date()
		}

		this.searches.push(search)
		return search
	}

	async getAllByUser(userId: string) {
		const searches = this.searches.filter(search => search.userId === userId)

		return searches
	}

	async delete(id: string) {
		const search = this.searches.find(search => search.id === id)

		if(!search) {
			return null
		}

		return search
	}
}