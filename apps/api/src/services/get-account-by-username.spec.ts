import { InMemoryAccountsRepository } from '@/repositories/in-memory/in-memory-accounts.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetAccountByUsernameService } from './get-account-by-username.service'
import { AccountNotFound } from './errors/account-not-found.error'

let accountsRepository: InMemoryAccountsRepository
let sut: GetAccountByUsernameService

const username = 'nickname'
const usernameWrong = 'username wrong'

describe('Find user by username', () => {
	beforeEach(() => {
		accountsRepository = new InMemoryAccountsRepository()
		sut = new GetAccountByUsernameService(accountsRepository)
	})

	it('should be able to find a user valid by username', async () => {
		const { account } = await sut.execute({
			username
		})

		expect(account.login).toEqual(username)
	})

	it('should not be able find a user with username invalid', async () => {
		await expect(() => sut.execute({
			username: usernameWrong
		})).rejects.toBeInstanceOf(AccountNotFound)
	})
})