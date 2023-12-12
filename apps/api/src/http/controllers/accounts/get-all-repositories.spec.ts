// @vitest-environment prisma

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

const username = 'alexandrebekor'
const email = 'test@email.com'
const password = 'password'

describe('E2E: Get user profile', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to get profile', async () => {
		const { token } = await createAndAuthenticateUser({
			username,
			email,
			password
		})

		const response = await request(app.server)
			.get(`/api/account/${username}/repos`)
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.statusCode).toEqual(200)
		expect(response.body).toEqual(expect.objectContaining({
			username
		}))
	})
})