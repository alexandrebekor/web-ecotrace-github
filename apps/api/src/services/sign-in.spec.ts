import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { SignInService } from './sign-in.service'
import { CredentialsInvalid } from './errors/credentials-invalid.error'
import bcryptjs from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let sut: SignInService

describe('Sign In user', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new SignInService(usersRepository)
	})

	it('should be able sign in', async () => {
		await usersRepository.create({
			email: 'staff@agenciabekor.com',
			username: 'alexandrebekor',
			password: await bcryptjs.hash('alexandre', 6)
		})

		const { user } = await sut.execute({
			email: 'staff@agenciabekor.com',
			password: 'alexandre'
		})

		expect(user.id).toEqual(expect.any(String))
	})

	it('should not be able sign in with wrong password', async () => {
		await usersRepository.create({
			email: 'staff@agenciabekor.com',
			username: 'alexandrebekor',
			password: await bcryptjs.hash('alexandre', 6)
		})

		await expect(() => sut.execute({
			email: 'staff@agenciabekor.com',
			password: 'alexandre12'
		})).rejects.toBeInstanceOf(CredentialsInvalid)
	})

	it('should not be able sign in with email not subscribed', async () => {
		await expect(() => sut.execute({
			email: 'staff@agenciabekor.com',
			password: 'alexandre'
		})).rejects.toBeInstanceOf(CredentialsInvalid)
	})
})