import 'dotenv/config'
import { z } from 'zod'

const schema = z.object({
	HOST: z.string(),
	PORT: z.coerce.number().default(3333),
	HOST_URL: z.string(),
	NODE_ENV: z.enum(['development', 'production', 'test']),
	TOKEN_GITHUB: z.string()
})

const _env = schema.safeParse(process.env)

if(!_env.success) {
	console.log('Failed Environmet Variables', _env.error.format())

	throw new Error('See .env')
}

export const env = _env.data