import server, { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { users } from './http/routes/users.route'
import { ZodError } from 'zod'
import { env } from './lib/env'
import { PrismaClientInitializationError } from '@prisma/client/runtime/library'
import { auth } from './http/routes/auth.route'

export const app = server()

app.register(users, {
	prefix: '/api/users'
})

app.register(auth, {
	prefix: '/api/auth'
})

app.setErrorHandler((error: FastifyError, _request: FastifyRequest, response: FastifyReply) => {
	if(error instanceof ZodError) {
		return response.status(400).send({
			message: 'Validation error',
			issues: error.format()
		})
	}

	if(error instanceof PrismaClientInitializationError) {
		return response.status(500).send({
			message: 'Database is not running'
		})
	}

	if(env.NODE_ENV !== 'production') {
		console.error(error)
	}

	return response.status(500).send({
		message: 'Internal server error.'
	})
})