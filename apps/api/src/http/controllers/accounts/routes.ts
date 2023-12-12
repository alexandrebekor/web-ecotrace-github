import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { getAccountByUsername } from './get-account-by-username.controller'
import { getAllRepositories } from './get-all-repositories.controller'

export const accountsRoutes = async (app: FastifyInstance) => {
	app.addHook('onRequest', verifyJWT)

	app.get('/account/:username', getAccountByUsername)
	app.get('/account/:username/repos', getAllRepositories)
}