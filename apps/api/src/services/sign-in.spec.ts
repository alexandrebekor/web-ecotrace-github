import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { describe, expect, it } from 'vitest'
import { SignUpService } from './sign-up.service'
import { GithubAccountsRepository } from '@/repositories/github/github-accounts.repository'
import { SignInService } from './sign-in.service'
import { CredentialsInvalid } from './errors/credentials-invalid.error'

describe('Sign In user', () => {
	it('should not be able to login password wrong', async () => {
		const usersRepository = new InMemoryUsersRepository()
		const accountsRepository = new GithubAccountsRepository()
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
})