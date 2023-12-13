// @vitest-environment prisma

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const username = 'alexandrebekor'
const newUsername = 'nickname'

const email = 'test@email.com'
const newEmail = 'test2@email.com'

const password = 'password'

describe('Update current user', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to update the current user', async () => {
		const { token } = await createAndAuthenticateUser({
			email,
			password,
			username
		})

		const response = await request(app.server)
			.put('/api/me')
			.set('Authorization', `Bearer ${token}`)
			.send({
				email: newEmail,
				username: newUsername
			})

		expect(response.statusCode).toEqual(200)
		expect(response.body.user).toEqual(expect.objectContaining({
			email: newEmail,
			username: newUsername
		}))
	})
})