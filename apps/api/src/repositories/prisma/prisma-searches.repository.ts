import { Prisma } from '@prisma/client'
import { SearchesRepository } from '../searches.repository'
import { prisma } from '@/lib/prisma'

export class PrismaSearchesRepository implements SearchesRepository {
	async create(data: Prisma.SearchUncheckedCreateInput) {
		const search = await prisma.search.create({
			data
		})

		return search
	}

	async getAllByUser(userId: string) {
		const search = await prisma.search.findMany({
			where: {
				userId
			},
			orderBy: {
				created_at: 'desc'
			}
		})

		return search
	}

	async delete(id: string) {
		const search = await prisma.search.delete({
			where: {
				id
			}
		})

		return search
	}
}