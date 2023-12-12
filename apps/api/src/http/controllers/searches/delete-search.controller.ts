import { ResourceNotFound } from '@/services/errors/resource-not-found.error'
import { makeDeleteSearch } from '@/services/factories/make-delete-search.factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const deleteSearch = async (request: FastifyRequest, response: FastifyReply) => {
	const schemaBody = z.object({
		searchId: z.string().min(1)
	})

	const { searchId } = schemaBody.parse(request.params)

	try {
		const deleteSearchService = makeDeleteSearch()

		const search = await deleteSearchService.execute({
			searchId
		})

		return response.status(200).send(search)
	} catch (error) {
		if(error instanceof ResourceNotFound) {
			return response.status(404).send({
				message: error.message
			})
		}

		throw error
	}
}