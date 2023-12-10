import { FastifyInstance } from 'fastify'
import { findUser } from '../controllers/find-user.controller'

export const users = async (app: FastifyInstance) => {
	app.get('/:username', findUser)
	app.get('/:username/repositories', findUser)
}