import { UsersRepository } from '@/repositories/users.repository'
import { beforeEach, describe, it } from 'vitest'
import { GetAllSearchesByUserService } from './get-all-searches-by-user.service'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { SearchesRepository } from '@/repositories/searches.repository'
import { InMemorySearchesRepository } from '@/repositories/in-memory/in-memory-searches.repository'

let usersRepository: UsersRepository
let searchesRepository: SearchesRepository
let sut: GetAllSearchesByUserService

describe('Get all searches by user', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		searchesRepository = new InMemorySearchesRepository()
		sut = new GetAllSearchesByUserService(usersRepository, searchesRepository)
	})

	it('should not be able if user is not exists', async () => {
		
	})
})