import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { CredentialsInvalid } from '@/services/errors/credentials-invalid.error'
import { SignInService } from '@/services/sign-in.service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const signIn = async (request: FastifyRequest, response: FastifyReply) => {
	const schema = z.object({
		email: z.string().email(),
		password: z.string().min(6)
	})

	const { email, password } = schema.parse(request.body)

	try {
		const usersRepository = new PrismaUsersRepository()
		const signInService = new SignInService(usersRepository)

		const { user } = await signInService.execute({
			email,
			password
		})

		const token = await response.jwtSign({}, {
			sign: {
				sub: user.id
			}
		})

		return response.status(200).send({
			token
		})
	} catch (error) {
		if(error instanceof CredentialsInvalid) {
			return response.status(400).send({
				message: error.message
			})
		}

		throw error
	}
}