import { Octokit } from '@octokit/core'
import { env } from './env'

export const octokit = new Octokit({
	auth: env.TOKEN_GITHUB,
	baseUrl: 'https://api.github.com'
})