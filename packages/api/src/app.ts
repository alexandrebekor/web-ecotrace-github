import server from 'fastify'
import { users } from './http/routes/users.route'

export const app = server()

app.register(users, {
	prefix: '/users'
})