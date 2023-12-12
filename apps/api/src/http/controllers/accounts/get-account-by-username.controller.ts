import { AccountNotFound } from '@/services/errors/account-not-found.error'
import { makeGetAccountByUsername } from '@/services/factories/make-get-account-by-username.factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const getAccountByUsername = async (request: FastifyRequest, response: FastifyReply) => {
	const schema = z.object({
		username: z.string().min(1)
	})

	const { username } = schema.parse(request.params)

	try {
		const findUserService = makeGetAccountByUsername()

		const { account } = await findUserService.execute({
			username
		})

		return response.status(200).send(account)
	} catch (error) {
		if(error instanceof AccountNotFound) {
			return response.status(404).send({
				message: error.message
			})
		}

		throw error
	}
}