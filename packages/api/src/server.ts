import { app } from './app'
import { env } from './lib/env'

app.listen({
	host: env.HOST,
	port: env.PORT
}).then(() => {
	console.log(`Started in PORT: ${env.PORT}`)
})