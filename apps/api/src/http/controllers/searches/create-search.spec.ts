// @vitest-environment prisma

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('E2E: Create search', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to create search', async () => {
		const username = 'alexandrebekor'
		const { token } = await createAndAuthenticateUser({
			username,
			email: 'staff@alexandrebekor.com',
			password: '123456'
		})

		const response = await request(app.server)
			.post('/api/searches')
			.set('Authorization', `Bearer ${token}`)
			.send({
				username: 'alexandrebekor'
			})

		expect(response.statusCode).toEqual(201)
		expect(response.body).toEqual(expect.objectContaining({
			username: 'alexandrebekor'
		}))
	})
})