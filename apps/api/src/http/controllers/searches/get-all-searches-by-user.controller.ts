import { ResourceNotFound } from '@/services/errors/resource-not-found.error'
import { makeGetAllSearchesByUser } from '@/services/factories/make-get-all-searches-by-user.factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const getAllSearchesByUser = async (request: FastifyRequest, response: FastifyReply) => {
	const schema = z.object({
		sub: z.string()
	})

	const { sub: userId } = schema.parse(request.user)

	try {
		const getAllSearchesByUserService = makeGetAllSearchesByUser()

		const searches = await getAllSearchesByUserService.execute({
			userId
		})

		return response.status(200).send(searches)
	} catch (error) {
		if(error instanceof ResourceNotFound) {
			return response.status(404).send({
				message: error.message
			})
		}

		throw error
	}
}