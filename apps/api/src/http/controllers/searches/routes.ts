import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { getAllSearchesByUser } from './get-all-searches-by-user.controller'
import { createSearch } from './create-search.controller'
import { deleteSearch } from './delete-search.controller'

export const searchesRoutes = async (app: FastifyInstance) => {
	app.addHook('onRequest', verifyJWT)

	app.post('/searches', createSearch)
	app.get('/searches', getAllSearchesByUser)
	app.delete('/searches/:searchId', deleteSearch)
}