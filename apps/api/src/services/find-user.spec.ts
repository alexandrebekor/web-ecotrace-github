import { InMemoryAccountsRepository } from '@/repositories/in-memory/in-memory-accounts.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FindUserService } from './find-user.service'
import { InvalidUsername } from './errors/invalid-username.error'

let accountsRepository: InMemoryAccountsRepository
let sut: FindUserService

describe('Find user by username', () => {
	beforeEach(() => {
		accountsRepository = new InMemoryAccountsRepository()
		sut = new FindUserService(accountsRepository)
	})

	it('should be able to find a user valid by username', async () => {
		const { account } = await sut.execute({
			username: 'alexandrebekor'
		})

		expect(account.login).toEqual('alexandrebekor')
	})

	it('should not be able find a user with username invalid', async () => {
		await expect(() => sut.execute({
			username: 'username wrong'
		})).rejects.toBeInstanceOf(InvalidUsername)
	})
})