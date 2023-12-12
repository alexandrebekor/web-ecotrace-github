import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'

export const searchesRoutes = async (app: FastifyInstance) => {
	app.addHook('onRequest', verifyJWT)

	app.post('/searches')
	app.get('/searches')
}