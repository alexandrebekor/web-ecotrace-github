import server, { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'
import { env } from './lib/env'
import { PrismaClientInitializationError } from '@prisma/client/runtime/library'
import { NotAuthorized } from './services/errors/not-authorized.error'
import { ApiNotResponding } from './services/errors/api-not-responding.error'
import { userRoutes } from './http/controllers/users/routes'
import fastifyJwt from '@fastify/jwt'
import { accountsRoutes } from './http/controllers/accounts/routes'
import { searchesRoutes } from './http/controllers/searches/routes'

export const app = server()

app.register(fastifyJwt, {
	secret: env.JWT
})

app.register(userRoutes, {
	prefix: '/api'
})

app.register(accountsRoutes, {
	prefix: '/api'
})

app.register(searchesRoutes, {
	prefix: '/api'
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

	if(error instanceof NotAuthorized) {
		return response.status(403).send({
			message: error.message
		})
	}

	if(error instanceof ApiNotResponding) {
		return response.status(500).send({
			message: error.message
		})
	}

	if(env.NODE_ENV !== 'production') {
		console.error(error)
	}

	return response.status(500).send({
		message: 'Internal server error.'
	})
})