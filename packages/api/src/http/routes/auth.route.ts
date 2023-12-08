import { FastifyInstance } from 'fastify'
import { signUp } from '../controllers/sign-up.controller'

export const auth = async (app: FastifyInstance) => {
	app.post('/register', signUp)
}