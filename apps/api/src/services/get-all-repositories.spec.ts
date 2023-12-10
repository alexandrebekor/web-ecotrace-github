import { InMemoryAccountsRepository } from '@/repositories/in-memory/in-memory-accounts.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetAllRepositoriesService } from './get-all-repositories'
import { InvalidUsername } from './errors/invalid-username.error'

let accountsRepository: InMemoryAccountsRepository
let sut: GetAllRepositoriesService

describe('Find repositories by username', () => {
	beforeEach(() => {
		accountsRepository = new InMemoryAccountsRepository()
		sut = new GetAllRepositoriesService(accountsRepository)
	})

	it('should be able to get all repositories by username', async () => {
		const { username, repos } = await sut.execute({
			username: 'alexandrebekor'
		})

		expect(username).toEqual('alexandrebekor')
		expect(repos).toEqual(expect.any(Array))
	})

	it('should not be able to get repositories when username is not valid', async () => {
		await expect(() => sut.execute({
			username: 'username wrong'
		})).rejects.toBeInstanceOf(InvalidUsername) 
	})
})