import { FastifyInstance } from 'fastify'
import { signUp } from '../controllers/sign-up.controller'

export const users = async (app: FastifyInstance) => {
	app.post('/', signUp)
}