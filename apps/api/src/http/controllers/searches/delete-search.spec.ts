// @vitest-environment prisma

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

const username = 'alexandrebekor'
const email = 'test@email.com'
const password = 'password'

describe('E2E: Delete search', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to delete search by id', async () => {
		const { token } = await createAndAuthenticateUser({
			username,
			email,
			password
		})

		await request(app.server)
			.post('/api/searches')
			.set('Authorization', `Bearer ${token}`)
			.send({
				username
			})

		const searchesResponse = await request(app.server)
			.get('/api/searches')
			.set('Authorization', `Bearer ${token}`)
			.send()

		const response = await request(app.server)
			.delete(`/api/searches/${searchesResponse.body.searches[0].id}`)
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.statusCode).toEqual(200)
	})
})