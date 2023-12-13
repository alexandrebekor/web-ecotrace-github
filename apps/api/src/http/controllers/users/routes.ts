import { FastifyInstance } from 'fastify'
import { signUp } from './sign-up.controller'
import { signIn } from './sign-in.controller'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { getUserProfile } from './get-user-profile.controller'
import { updateUser } from './update-user.controller'

export const userRoutes = async (app: FastifyInstance) => {
	// Public
	app.post('/register', signUp)
	app.post('/auth', signIn)

	// Private
	app.get('/me', { onRequest: [verifyJWT] }, getUserProfile)
	app.put('/me', { onRequest: [verifyJWT] }, updateUser)
}