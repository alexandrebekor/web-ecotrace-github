// @vitest-environment prisma

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

const username = 'alexandrebekor'
const email = 'test@email.com'
const password = 'password'

describe('E2E: Get all searches by User', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to get searches', async () => {
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
    
		const response = await request(app.server)
			.get('/api/searches')
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.statusCode).toEqual(200)
		expect(response.body.searches).toHaveLength(1)
		expect(response.body.searches).toEqual([
			expect.objectContaining({
				username
			})
		])
	})
})