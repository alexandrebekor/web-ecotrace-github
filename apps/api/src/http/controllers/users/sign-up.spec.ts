// @vitest-environment prisma

import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const username = 'alexandrebekor'
const email = 'test@email.com'
const password = 'password'

describe('E2E: Sign Up', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to sign up', async () => {
		const response = await request(app.server).post('/api/register').send({
			username,
			email,
			password
		})

		expect(response.statusCode).toEqual(201)
	})
})