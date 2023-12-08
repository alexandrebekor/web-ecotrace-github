import { GithubAccountsRepository } from '@/repositories/github/github-accounts.repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { it, expect, describe } from 'vitest'
import { SignInService } from './sign-in.service'
import { compare } from 'bcryptjs'
import { UserAlreadyExists } from './errors/user-already-exists.error'
import { InvalidUsername } from './errors/invalid-username.error'

describe('Sign Up user', () => {
	it('should be able to sign up', async () => {
		const usersRepository = new InMemoryUsersRepository()
		const accountsRepository = new GithubAccountsRepository()
		const signUpService = new SignInService(usersRepository, accountsRepository)
    
		const { user } = await signUpService.execute({
			username: 'alexandrebekor',
			email: 'staff@agenciabekor.com',
			password: '123456'
		})

		expect(user.id).toEqual(expect.any(String))
	})
  
	it('should hash the password', async () => {
		const usersRepository = new InMemoryUsersRepository()
		const accountsRepository = new GithubAccountsRepository()
		const signUpService = new SignInService(usersRepository, accountsRepository)

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
		const accountsRepository = new GithubAccountsRepository()
		const signUpService = new SignInService(usersRepository, accountsRepository)

		const email = 'alexandre@bekor.com'

		await signUpService.execute({
			username: 'alexandrebekor',
			email,
			password: '123456'
		})

		expect(() => signUpService.execute({
			username: 'alexandrebekor',
			email,
			password: '123456'
		})).rejects.toBeInstanceOf(UserAlreadyExists)
	})

	it('should not be able to create a new user with a username without account in github', async () => {
		const usersRepository = new InMemoryUsersRepository()
		const accountsRepository = new GithubAccountsRepository()
		const signUpService = new SignInService(usersRepository, accountsRepository)

		expect(() => signUpService.execute({
			username: 'username que não existe',
			email: 'alexandre@bekor.com',
			password: '123456'
		})).rejects.toBeInstanceOf(InvalidUsername)
	})
})