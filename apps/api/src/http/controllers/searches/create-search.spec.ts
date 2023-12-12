// @vitest-environment prisma

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

const username = 'alexandrebekor'
const email = 'test@email.com'
const password = 'password'

describe('E2E: Create search', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to create search', async () => {
		const { token } = await createAndAuthenticateUser({
			username,
			email,
			password
		})

		const response = await request(app.server)
			.post('/api/searches')
			.set('Authorization', `Bearer ${token}`)
			.send({
				username
			})

		expect(response.statusCode).toEqual(201)
		expect(response.body).toEqual(expect.objectContaining({
			username
		}))
	})
})