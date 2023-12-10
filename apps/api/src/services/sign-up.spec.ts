import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { it, expect, describe, beforeEach } from 'vitest'
import { SignUpService } from './sign-up.service'
import { compare } from 'bcryptjs'
import { UserAlreadyExists } from './errors/user-already-exists.error'
import { InvalidUsername } from './errors/invalid-username.error'
import { InMemoryAccountsRepository } from '@/repositories/in-memory/in-memory-accounts.repository'

let usersRepository: InMemoryUsersRepository
let accountsRepository: InMemoryAccountsRepository
let sut: SignUpService

describe('Sign Up user', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		accountsRepository = new InMemoryAccountsRepository()
		sut = new SignUpService(usersRepository, accountsRepository)
	})

	it('should be able to sign up', async () => {
		const { user } = await sut.execute({
			username: 'alexandrebekor',
			email: 'staff@agenciabekor.com',
			password: '123456'
		})

		expect(user.id).toEqual(expect.any(String))
	})
  
	it('should hash the password', async () => {
		const { user } = await sut.execute({
			username: 'alexandrebekor',
			email: 'staff@agenciabekor.com',
			password: '123456'
		})

		const isHashPassword = await compare('123456', user.password)
		expect(isHashPassword).toBe(true)
	})

	it('should not be able to create a new user if email already exists', async () => {
		const email = 'alexandre@bekor.com'

		await sut.execute({
			username: 'alexandrebekor',
			email,
			password: '123456'
		})

		await expect(() => sut.execute({
			username: 'alexandrebekor',
			email,
			password: '123456'
		})).rejects.toBeInstanceOf(UserAlreadyExists)
	})

	it('should not be able to create a new user with a username without account in github', async () => {
		await expect(() => sut.execute({
			username: 'username wrong',
			email: 'alexandre@bekor.com',
			password: '123456'
		})).rejects.toBeInstanceOf(InvalidUsername)
	})
})