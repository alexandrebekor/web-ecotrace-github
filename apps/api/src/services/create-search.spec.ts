import { AccountsRepository } from '@/repositories/accounts.repository'
import { UsersRepository } from '@/repositories/users.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateSearchService } from './create-search.service'
import { SearchesRepository } from '@/repositories/searches.repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { InMemoryAccountsRepository } from '@/repositories/in-memory/in-memory-accounts.repository'
import { InMemorySearchesRepository } from '@/repositories/in-memory/in-memory-searches.repository'
import { ResourceNotFound } from './errors/resource-not-found.error'
import { randomUUID } from 'crypto'
import { AccountNotFound } from './errors/account-not-found.error'

let usersRepository: UsersRepository
let accountsRepository: AccountsRepository
let searchesRepository: SearchesRepository
let sut: CreateSearchService

const email = 'staff@alexandrebekor.com'
const username = 'nickname'
const password = 'password'
const usernameWrong = 'username wrong'

describe('Create a new search', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		accountsRepository = new InMemoryAccountsRepository()
		searchesRepository = new InMemorySearchesRepository()
		sut = new CreateSearchService(usersRepository, searchesRepository, accountsRepository)
	})

	it('should not be able to search with invalid user id', async () => {
		await expect(() => sut.execute({
			userId: randomUUID(),
			username
		})).rejects.toBeInstanceOf(ResourceNotFound)
	})

	it('should not be able to search if username is invalid', async () => {
		const user = await usersRepository.create({
			email,
			username,
			password
		})

		await expect(() => sut.execute({
			userId: user.id,
			username: usernameWrong
		})).rejects.toBeInstanceOf(AccountNotFound)
	})

	it('should be able to create a new search', async () => {
		const user = await usersRepository.create({
			email,
			username,
			password
		})

		const search = await sut.execute({
			userId: user.id,
			username
		})
    
		expect(search.username).toEqual(username)
		expect(search.repositories).toEqual(expect.any(Array))
	})
})