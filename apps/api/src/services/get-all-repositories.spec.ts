import { InMemoryAccountsRepository } from '@/repositories/in-memory/in-memory-accounts.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetAllRepositoriesService } from './get-all-repositories.service'
import { AccountNotFound } from './errors/account-not-found.error'

let accountsRepository: InMemoryAccountsRepository
let sut: GetAllRepositoriesService

const username = 'nickname'
const usernameWrong = 'username wrong'

describe('Find repositories by username', () => {
	beforeEach(() => {
		accountsRepository = new InMemoryAccountsRepository()
		sut = new GetAllRepositoriesService(accountsRepository)
	})

	it('should be able to get all repositories by username', async () => {
		const repository = await sut.execute({
			username
		})

		expect(repository.username).toEqual(username)
		expect(repository.repos).toEqual(expect.any(Array))
	})

	it('should not be able to get repositories when username is not valid', async () => {
		await expect(() => sut.execute({
			username: usernameWrong
		})).rejects.toBeInstanceOf(AccountNotFound) 
	})
})