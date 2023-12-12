// @vitest-environment prisma

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('E2E: Get all searches by User', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to get searches', async () => {
		const username = 'alexandrebekor'
		const { token } = await createAndAuthenticateUser({
			username,
			email: 'staff@alexandrebekor.com',
			password: '123456'
		})
    
		await request(app.server)
			.post('/api/searches')
			.set('Authorization', `Bearer ${token}`)
			.send({
				username: 'alexandrebekor'
			})
    
		const response = await request(app.server)
			.get('/api/searches')
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.statusCode).toEqual(200)
		expect(response.body.searches).toHaveLength(1)
		expect(response.body.searches).toEqual([
			expect.objectContaining({
				username: 'alexandrebekor'
			})
		])
	})
})