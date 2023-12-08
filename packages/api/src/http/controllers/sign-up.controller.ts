import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { UserAlreadyExists } from '@/services/errors/user-already-exists.error'
import { SignInService } from '@/services/sign-in.service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const signUp = async (request: FastifyRequest, response: FastifyReply) => {
	const schema = z.object({
		username: z.string(),
		email: z.string().email(),
		password: z.string().min(6)
	})

	const { username, email, password } = schema.parse(request.body)

	try {
		const usersRepository = new PrismaUsersRepository()
		const signUpService = new SignInService(usersRepository)

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

		throw error
	}

	return response.status(201).send()
}