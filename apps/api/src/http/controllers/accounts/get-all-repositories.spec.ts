// @vitest-environment prisma

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('E2E: Get user profile', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to get profile', async () => {
		const username = 'alexandrebekor'
		const { token } = await createAndAuthenticateUser({
			username,
			email: 'staff@alexandrebekor.com',
			password: '123456'
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