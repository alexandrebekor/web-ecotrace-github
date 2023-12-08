import server, { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { users } from './http/routes/users.route'
import { ZodError } from 'zod'
import { env } from './lib/env'

export const app = server()

app.register(users, {
	prefix: '/users'
})

app.setErrorHandler((error: FastifyError, _request: FastifyRequest, response: FastifyReply) => {
	if(error instanceof ZodError) {
		return response.status(400).send({
			data: null,
			error: {
				message: 'Validation error.',
				issues: error.format()
			}
		})
	}

	if(env.NODE_ENV !== 'production') {
		console.error(error)
	}

	return response.status(500).send({
		message: 'Internal server error.'
	})
})