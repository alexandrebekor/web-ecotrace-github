import { GithubPrivateAccountsRepository } from '@/repositories/github-private/github-private-accounts.repository'
import { InvalidUsername } from '@/services/errors/invalid-username.error'
import { FindUserService } from '@/services/find-user'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const findUser = async (request: FastifyRequest, response: FastifyReply) => {
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
		if(error instanceof InvalidUsername) {
			return {
				message: error.message
			}
		}

		throw error
	}
}