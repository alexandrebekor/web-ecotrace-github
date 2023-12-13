import { CredentialsInvalid } from '@/services/errors/credentials-invalid.error'
import { makeSignInFactory } from '@/services/factories/make-sign-in.factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const signIn = async (request: FastifyRequest, response: FastifyReply) => {
	const schema = z.object({
		email: z.string().email(),
		password: z.string().min(6)
	})

	const { email, password } = schema.parse(request.body)

	try {
		const signInService = makeSignInFactory()

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
			token,
			username: user.username
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