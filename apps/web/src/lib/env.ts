import { z } from 'zod'

const schema = z.object({
	AUTH_TOKEN: z.string(),
	BASE_API_URL: z.string()
})

const _env = schema.safeParse(process.env)

if(!_env.success) {
	throw new Error('Environment variable not found')
}

export const env = _env.data