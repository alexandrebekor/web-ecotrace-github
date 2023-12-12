import { GithubPrivateAccountsRepository } from '@/repositories/github-private/github-private-accounts.repository'
import { ResourceNotFound } from '@/services/errors/resource-not-found.error'
import { FindUserService } from '@/services/find-user.service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const getAccountByUsername = async (request: FastifyRequest, response: FastifyReply) => {
	const schema = z.object({
		username: z.string().min(1)
	})

	const { username } = schema.parse(request.params)

	try {
		const accountsRepository = new GithubPrivateAccountsRepository()
		const findUserService = new FindUserService(accountsRepository)

		const { account } = await findUserService.execute({
			username
		})

		return response.status(200).send(account)
	} catch (error) {
		if(error instanceof ResourceNotFound) {
			return response.status(404).send({
				message: error.message
			})
		}

		throw error
	}
}