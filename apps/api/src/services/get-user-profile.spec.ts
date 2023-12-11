import { UsersRepository } from '@/repositories/users.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserProfileService } from './get-user-profile.service'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import bcryptjs from 'bcryptjs'
import { ResourceNotFound } from './errors/resource-not-found.error'

let usersRepository: UsersRepository
let sut: GetUserProfileService

describe('Get user Profile', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new GetUserProfileService(usersRepository)
	})

	it('should be able to get profile', async () => {
		const newUser = await usersRepository.create({
			email: 'staff@agenciabekor.com',
			username: 'alexandrebekor',
			password: await bcryptjs.hash('123456', 6)
		})

		const { user } = await sut.execute({
			userId: newUser.id
		})

		expect(user.id).toEqual(expect.any(String))
	})

	it('should not be able to get profile if id not exists', async () => {
		await expect(() => sut.execute({
			userId: '123456'
		})).rejects.toBeInstanceOf(ResourceNotFound)
	})
})