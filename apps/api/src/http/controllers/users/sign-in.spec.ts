// @vitest-environment prisma

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('E2E: Sign in', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to sign in', async () => {
		await request(app.server).post('/api/register').send({
			username: 'alexandrebekor',
			email: 'staff@agenciabekor.com',
			password: '123456'
		})

		const response = await request(app.server).post('/api/auth').send({
			email: 'staff@agenciabekor.com',
			password: '123456'
		})

		expect(response.statusCode).toEqual(200)
		expect(response.body).toEqual({
			token: expect.any(String)
		})
	})
})