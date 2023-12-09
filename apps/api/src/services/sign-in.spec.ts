import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { describe, expect, it } from 'vitest'
import { SignUpService } from './sign-up.service'
import { SignInService } from './sign-in.service'
import { CredentialsInvalid } from './errors/credentials-invalid.error'
import { InMemoryAccountsRepository } from '@/repositories/in-memory/in-memory-accounts.repository'

describe('Sign In user', () => {
	it('should be able sign in', async () => {
		const usersRepository = new InMemoryUsersRepository()
		const accountsRepository = new InMemoryAccountsRepository()
		const signUpService = new SignUpService(usersRepository, accountsRepository)

		await signUpService.execute({
			email: 'staff@agenciabekor.com',
			username: 'alexandrebekor',
			password: 'alexandre123'
		})

		const signInService = new SignInService(usersRepository)

		const user = await signInService.execute({
			email: 'staff@agenciabekor.com',
			password: 'alexandre123'
		})

		expect(user.message).toEqual('Entrou!')
	})

	it('should not be able sign in with wrong password', async () => {
		const usersRepository = new InMemoryUsersRepository()
		const accountsRepository = new InMemoryAccountsRepository()
		const signUpService = new SignUpService(usersRepository, accountsRepository)

		await signUpService.execute({
			email: 'staff@agenciabekor.com',
			username: 'alexandrebekor',
			password: 'alexandre123'
		})

		const signInService = new SignInService(usersRepository)

		await expect(() => signInService.execute({
			email: 'staff@agenciabekor.com',
			password: 'alexandre'
		})).rejects.toBeInstanceOf(CredentialsInvalid)
	})

	it('should not be able sign in with email not subscribed', async () => {
		const usersRepository = new InMemoryUsersRepository()
		const signInService = new SignInService(usersRepository)

		await expect(() => signInService.execute({
			email: 'staff@agenciabekor.com',
			password: 'alexandre'
		})).rejects.toBeInstanceOf(CredentialsInvalid)
	})
})