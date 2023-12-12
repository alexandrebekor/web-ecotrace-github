import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users.repository'
import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository implements UsersRepository {
	async create(data: Prisma.UserCreateInput) {
		const user = await prisma.user.create({
			data
		})

		return user
	}

	async update(id: string, data: Prisma.UserUpdateInput) {
		const user = await prisma.user.update({
			data,
			where: {
				id
			}
		})

		if(!user) {
			return null
		}

		return user
	}

	async getByEmail(email: string) {
		const user = await prisma.user.findUnique({
			where: {
				email
			}
		})

		if(!user) {
			return null
		}

		return user
	}

	async getById(id: string) {
		const user = await prisma.user.findUnique({
			where: {
				id
			}
		})

		if(!user) {
			return null
		}

		return user
	}
}