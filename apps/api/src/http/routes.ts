import { FastifyInstance } from 'fastify'
import { signUp } from './controllers/sign-up.controller'
import { signIn } from './controllers/sign-in.controller'
import { findUser } from './controllers/find-user.controller'
import { verifyJWT } from './middlewares/verify-jwt'
import { getAllRepositories } from './controllers/get-all-repositories.controller'
import { getUserProfile } from './controllers/get-user-profile.controller'

export const routes = async (app: FastifyInstance) => {
	// Public
	app.post('/auth', signUp)
	app.post('/login', signIn)

	// Private
	app.get('/me', { onRequest: [verifyJWT] }, getUserProfile)
	app.get('/users/:username', { onRequest: [verifyJWT] }, findUser)
	app.get('/users/:username/repos', { onRequest: [verifyJWT] }, getAllRepositories)
}