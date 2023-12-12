import { AccountNotFound } from '@/services/errors/account-not-found.error'
import { ResourceNotFound } from '@/services/errors/resource-not-found.error'
import { makeCreateSearch } from '@/services/factories/make-create-search.factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const createSearch = async (request: FastifyRequest, response: FastifyReply) => {
	const schema = z.object({
		sub: z.string()
	})

	const { sub: userId } = schema.parse(request.user)

	const schemaBody = z.object({
		username: z.string().min(1)
	})

	const { username } = schemaBody.parse(request.body)

	try {
		const createSearchService = makeCreateSearch()

		const searches = await createSearchService.execute({
			userId,
			username
		})

		return response.status(201).send(searches)
	} catch (error) {
		if(error instanceof ResourceNotFound) {
			return response.status(404).send({
				message: error.message
			})
		}

		if(error instanceof AccountNotFound) {
			return response.status(404).send({
				message: error.message
			})
		}

		throw error
	}
}