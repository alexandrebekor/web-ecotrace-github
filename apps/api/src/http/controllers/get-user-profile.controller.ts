import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { ResourceNotFound } from '@/services/errors/resource-not-found.error'
import { GetUserProfileService } from '@/services/get-user-profile.service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const getUserProfile = async (request: FastifyRequest, response: FastifyReply) => {
	const schema = z.object({
		sub: z.string()
	})

	const { sub: userId } = schema.parse(request.user)

	try {
		const usersRepository = new PrismaUsersRepository()
		const getUserProfileService = new GetUserProfileService(usersRepository)
    
		const { user } = await getUserProfileService.execute({
			userId
		})

		return response.status(200).send({
			...user,
			password: undefined
		})
	} catch (error) {
		if(error instanceof ResourceNotFound) {
			return response.status(404).send({
				message: error.message
			})

			throw error
		}
	}
}