import { GithubPrivateAccountsRepository } from '@/repositories/github-private/github-private-accounts.repository'
import { InvalidUsername } from '@/services/errors/invalid-username.error'
import { GetAllRepositoriesService } from '@/services/get-all-repositories'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const getAllRepositories = async (request: FastifyRequest, response: FastifyReply) => {
	const schema = z.object({
		username: z.string().min(1)
	})

	const { username } = schema.parse(request.params)

	try {
		const accountsRepository = new GithubPrivateAccountsRepository()
		const getAllRepositoriesService = new GetAllRepositoriesService(accountsRepository)

		const repositories = await getAllRepositoriesService.execute({
			username
		})

		return response.status(200).send(repositories)
	} catch (error) {
		if(error instanceof InvalidUsername) {
			return response.status(400).send({
				message: error.message
			})
		}
	}
}