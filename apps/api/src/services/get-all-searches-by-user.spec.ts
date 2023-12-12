import { UsersRepository } from '@/repositories/users.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetAllSearchesByUserService } from './get-all-searches-by-user.service'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { SearchesRepository } from '@/repositories/searches.repository'
import { InMemorySearchesRepository } from '@/repositories/in-memory/in-memory-searches.repository'
import { randomUUID } from 'crypto'
import { ResourceNotFound } from './errors/resource-not-found.error'

let usersRepository: UsersRepository
let searchesRepository: SearchesRepository
let sut: GetAllSearchesByUserService

const email = 'teste@email.com'
const username = 'nickname'
const password = 'password'

describe('Get all searches by user', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		searchesRepository = new InMemorySearchesRepository()
		sut = new GetAllSearchesByUserService(usersRepository, searchesRepository)
	})

	it('should not be able if user is not exists', async () => {
		await expect(() => sut.execute({
			userId: randomUUID()
		})).rejects.toBeInstanceOf(ResourceNotFound)
	})

	it('should be able to get the searches by user', async () => {
		const user = await usersRepository.create({
			email,
			username,
			password,
		})

		await searchesRepository.create({
			userId: user.id,
			username
		})

		const { searches } = await sut.execute({
			userId: user.id
		})

		expect(searches).toHaveLength(1)
		expect(searches).toEqual([
			expect.objectContaining({
				username
			})
		])
	})

})