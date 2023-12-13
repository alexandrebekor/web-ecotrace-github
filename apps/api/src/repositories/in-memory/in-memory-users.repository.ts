import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users.repository'
import { randomUUID } from 'crypto'
import { ResourceNotFound } from '@/services/errors/resource-not-found.error'

export class InMemoryUsersRepository implements UsersRepository {
	private users: User[] = []

	async create(data: Prisma.UserCreateInput) {
		const user = {
			id: randomUUID(),
			username: data.username,
			email: data.email,
			password: data.password,
			name: data.name ?? null,
			followers: data.followers ?? null,
			following: data.following ?? null,
			repositories: data.repositories ?? null,
			bio: data.bio ?? null,
			twitter_username: data.twitter_username ?? null,
			company: data.company ?? null,
			site: data.site ?? null,
			avatar_url: data.avatar_url ?? null,
			created_at: new Date()
		}
    
		this.users.push(user)
		return user
	}

	async update(id: string, data: User) {
		const currentUser = this.users.find(user => user.id === id)

		if(!currentUser) {
			throw new ResourceNotFound()
		}

		const user = {
			id,
			username: data.username ?? currentUser.username,
			email: data.email ?? currentUser.email,
			password: data.password ?? currentUser.password,
			name: data.name ?? currentUser.name,
			followers: data.followers ?? currentUser.followers,
			following: data.following ?? currentUser.following,
			repositories: data.repositories ?? currentUser.repositories,
			bio: data.bio ?? currentUser.bio,
			twitter_username: data.twitter_username ?? currentUser.twitter_username,
			company: data.company ?? currentUser.company,
			site: data.site ?? currentUser.site,
			avatar_url: data.avatar_url ?? currentUser.avatar_url,
			created_at: currentUser.created_at
		}

		return user
	}

	async getByEmail(email: string) {
		const user = this.users.find(user => user.email === email)

		if(!user) {
			return null
		}

		return user
	}

	async getById(id: string) {
		const user = this.users.find(user => user.id === id)

		if(!user) {
			return null
		}

		return user
	}
}