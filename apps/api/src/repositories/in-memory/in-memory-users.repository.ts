import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users.repository'
import { randomUUID } from 'crypto'

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

	async findByEmail(email: string) {
		const user = this.users.find(user => user.email === email)

		if(!user) {
			return null
		}

		return user
	}

	async findById(userId: string) {
		const user = this.users.find(user => user.id === userId)

		if(!user) {
			return null
		}

		return user
	}
}