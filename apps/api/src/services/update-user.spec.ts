import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateUserService } from './update-user.service'
import { randomUUID } from 'crypto'
import { ResourceNotFound } from './errors/resource-not-found.error'
import { InMemoryAccountsRepository } from '@/repositories/in-memory/in-memory-accounts.repository'
import { AccountNotFound } from './errors/account-not-found.error'
import bcryptjs from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let accountsRepository: InMemoryAccountsRepository
let sut: UpdateUserService

const email = 'test@email.com'
const newEmail = 'staff@email.com'

const username = 'nickname'
const usernameWrong = 'username wrong'
const newUsername = 'nickname2'

const password = 'password'
const newPassword = 'password2'

describe('Update a user', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		accountsRepository = new InMemoryAccountsRepository()
		sut = new UpdateUserService(usersRepository, accountsRepository)
	})
  
	it('should not be able to update if a user is not exists', async () => {
		await expect(() => sut.execute({
			userId: randomUUID(),
			email,
			password,
			username
		})).rejects.toBeInstanceOf(ResourceNotFound)
	})

	it('should not be able to update if the username is not exists', async () => {
		const user = await usersRepository.create({
			email,
			password,
			username
		})
    
		await expect(() => sut.execute({
			userId: user.id,
			email,
			password,
			username: usernameWrong
		})).rejects.toBeInstanceOf(AccountNotFound)
	})

	it('should be able to update only email', async () => {
		const newUser = await usersRepository.create({
			email,
			password,
			username
		})

		const { user } = await sut.execute({
			userId: newUser.id,
			email: newEmail,
		})

		expect(user.email).toEqual(newEmail)
		expect(user.username).toEqual(username)
		expect(user.password).toEqual(password)
	})

	it('should be able to update only username', async () => {
		const newUser = await usersRepository.create({
			email,
			password,
			username
		})

		const { user } = await sut.execute({
			userId: newUser.id,
			username: newUsername,
		})

		expect(user.email).toEqual(email)
		expect(user.username).toEqual(newUsername)
		expect(user.password).toEqual(password)
	})

	it('should be able to update only password with hash', async () => {
		const newUser = await usersRepository.create({
			email,
			password,
			username
		})

		const { user } = await sut.execute({
			userId: newUser.id,
			password: newPassword,
		})

		const isSamePassword = await bcryptjs.compare(newPassword, user.password)

		expect(user.email).toEqual(email)
		expect(user.username).toEqual(username)
		expect(isSamePassword).toEqual(true)
	})
})
