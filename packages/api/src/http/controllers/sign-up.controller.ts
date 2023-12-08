import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { GithubRepository } from '@/repositories/github/github-accounts.repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { InvalidUsername } from '@/services/errors/invalid-username.error'
import { UserAlreadyExists } from '@/services/errors/user-already-exists.error'
import { SignInService } from '@/services/sign-in.service'

export const signUp = async (request: FastifyRequest, response: FastifyReply) => {
	const schema = z.object({
		username: z.string(),
		email: z.string().email(),
		password: z.string().min(6)
	})

	const { username, email, password } = schema.parse(request.body)

	try {
		const usersRepository = new PrismaUsersRepository()
		const accountsRepository = new GithubRepository()
		
		const signUpService = new SignInService(usersRepository, accountsRepository)

		await signUpService.execute({
			username,
			email,
			password
		})
		
	} catch (error) {
		if(error instanceof UserAlreadyExists) {
			return response.status(409).send({
				message: error.message
			})
		}

		if(error instanceof InvalidUsername) {
			return response.status(404).send({
				message: error.message
			})
		}

		throw error
	}

	return response.status(201).send()
}