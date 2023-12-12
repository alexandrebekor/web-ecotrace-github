import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { it, expect, describe, beforeEach } from 'vitest'
import { SignUpService } from './sign-up.service'
import { compare } from 'bcryptjs'
import { UserAlreadyExists } from './errors/user-already-exists.error'
import { InMemoryAccountsRepository } from '@/repositories/in-memory/in-memory-accounts.repository'
import { AccountNotFound } from './errors/account-not-found.error'

let usersRepository: InMemoryUsersRepository
let accountsRepository: InMemoryAccountsRepository
let sut: SignUpService

const email = 'teste@email.com'
const username = 'nickname'
const password = 'password'

describe('Sign Up user', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		accountsRepository = new InMemoryAccountsRepository()
		sut = new SignUpService(usersRepository, accountsRepository)
	})

	it('should be able to sign up', async () => {
		const { user } = await sut.execute({
			username,
			email,
			password
		})

		expect(user.id).toEqual(expect.any(String))
	})
  
	it('should hash the password', async () => {
		const { user } = await sut.execute({
			username,
			email,
			password
		})

		const isHashPassword = await compare(password, user.password)
		expect(isHashPassword).toBe(true)
	})

	it('should not be able to create a new user if email already exists', async () => {
		await sut.execute({
			username,
			email,
			password
		})

		await expect(() => sut.execute({
			username,
			email,
			password
		})).rejects.toBeInstanceOf(UserAlreadyExists)
	})

	it('should not be able to create a new user with a username without account in github', async () => {
		await expect(() => sut.execute({
			username: 'username wrong',
			email,
			password
		})).rejects.toBeInstanceOf(AccountNotFound)
	})
})