import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExists } from '@/services/errors/user-already-exists.error'
import { makeSignUpFactory } from '@/services/factories/make-sign-up.factory'
import { AccountNotFound } from '@/services/errors/account-not-found.error'

export const signUp = async (request: FastifyRequest, response: FastifyReply) => {
	const schema = z.object({
		username: z.string().min(1),
		email: z.string().email(),
		password: z.string().min(6)
	})

	const { username, email, password } = schema.parse(request.body)

	try {
		const signUpService = makeSignUpFactory()

		const { user } = await signUpService.execute({
			username,
			email,
			password
		})
		
		const token = await response.jwtSign({}, {
			sign: {
				sub: user.id
			}
		})

		return response.status(201).send({
			token
		})
	} catch (error) {
		if(error instanceof UserAlreadyExists) {
			return response.status(409).send({
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