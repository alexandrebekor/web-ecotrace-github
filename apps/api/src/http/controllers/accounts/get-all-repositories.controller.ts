import { AccountNotFound } from '@/services/errors/account-not-found.error'
import { makeGetAllRepositories } from '@/services/factories/make-get-all-repositories.factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const getAllRepositories = async (request: FastifyRequest, response: FastifyReply) => {
	const schema = z.object({
		username: z.string().min(1)
	})

	const { username } = schema.parse(request.params)

	try {
		const getAllRepositoriesService = makeGetAllRepositories()

		const repositories = await getAllRepositoriesService.execute({
			username
		})

		return response.status(200).send(repositories)
	} catch (error) {
		if(error instanceof AccountNotFound) {
			return response.status(404).send({
				message: error.message
			})
		}

		throw error
	}
}