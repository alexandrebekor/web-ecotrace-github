import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { it, expect, describe } from 'vitest'
import { SignUpService } from './sign-up.service'
import { compare } from 'bcryptjs'
import { UserAlreadyExists } from './errors/user-already-exists.error'
import { InvalidUsername } from './errors/invalid-username.error'
import { InMemoryAccountsRepository } from '@/repositories/in-memory/in-memory-accounts.repository'

describe('Sign Up user', () => {
	it('should be able to sign up', async () => {
		const usersRepository = new InMemoryUsersRepository()
		const accountsRepository = new InMemoryAccountsRepository()
		const signUpService = new SignUpService(usersRepository, accountsRepository)
    
		const { user } = await signUpService.execute({
			username: 'alexandrebekor',
			email: 'staff@agenciabekor.com',
			password: '123456'
		})

		expect(user.id).toEqual(expect.any(String))
	})
  
	it('should hash the password', async () => {
		const usersRepository = new InMemoryUsersRepository()
		const accountsRepository = new InMemoryAccountsRepository()
		const signUpService = new SignUpService(usersRepository, accountsRepository)

		const { user } = await signUpService.execute({
			username: 'alexandrebekor',
			email: 'staff@agenciabekor.com',
			password: '123456'
		})

		const isHashPassword = await compare('123456', user.password)
		expect(isHashPassword).toBe(true)
	})

	it('should not be able to create a new user if email already exists', async () => {
		const usersRepository = new InMemoryUsersRepository()
		const accountsRepository = new InMemoryAccountsRepository()
		const signUpService = new SignUpService(usersRepository, accountsRepository)

		const email = 'alexandre@bekor.com'

		await signUpService.execute({
			username: 'alexandrebekor',
			email,
			password: '123456'
		})

		await expect(() => signUpService.execute({
			username: 'alexandrebekor',
			email,
			password: '123456'
		})).rejects.toBeInstanceOf(UserAlreadyExists)
	})

	it('should not be able to create a new user with a username without account in github', async () => {
		const usersRepository = new InMemoryUsersRepository()
		const accountsRepository = new InMemoryAccountsRepository()
		const signUpService = new SignUpService(usersRepository, accountsRepository)

		await expect(() => signUpService.execute({
			username: 'username wrong',
			email: 'alexandre@bekor.com',
			password: '123456'
		})).rejects.toBeInstanceOf(InvalidUsername)
	})
})