import { AccountNotFound } from '@/services/errors/account-not-found.error'
import { ResourceNotFound } from '@/services/errors/resource-not-found.error'
import { makeUpdateUserFactory } from '@/services/factories/make-update-user.factory'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export const updateUser = async (request: FastifyRequest, response: FastifyReply) => {
	const schema = z.object({
		sub: z.string()
	})

	const { sub: userId } = schema.parse(request.user)

	const schemaBody = z.object({
		email: z.string().email().optional(),
		password: z.string().optional(),
		username: z.string().optional()
	})

	const { email, password, username } = schemaBody.parse(request.body)

	try {
		const updateUserService = makeUpdateUserFactory()

		const user = await updateUserService.execute({
			userId,
			email,
			password,
			username
		})

		return response.status(200).send(user)
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