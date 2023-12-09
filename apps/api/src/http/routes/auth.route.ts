import { FastifyInstance } from 'fastify'
import { signUp } from '../controllers/sign-up.controller'
import { SignIn } from '../controllers/sign-in.controller'

export const auth = async (app: FastifyInstance) => {
	app.post('/register', signUp)
	app.post('/login', SignIn)
}