import { FastifyInstance } from 'fastify'
import { signUp } from './controllers/sign-up.controller'
import { signIn } from './controllers/sign-in.controller'
import { findUser } from './controllers/find-user.controller'

export const routes = async (app: FastifyInstance) => {
	app.post('/auth', signUp)
	app.post('/login', signIn)

	app.get('/me', findUser)
	app.get('/users/:username', findUser)
	app.get('/users/:username/repos', findUser)
}