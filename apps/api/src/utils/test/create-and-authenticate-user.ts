import { app } from '@/app'
import request from 'supertest'

type createAndAuthenticateUserRequest = {
  username: string
  email: string
  password: string
}

export const createAndAuthenticateUser = async ({
	username,
	email,
	password
}: createAndAuthenticateUserRequest) => {
	await request(app.server).post('/api/register').send({
		username,
		email,
		password
	})

	const authResponse = await request(app.server).post('/api/auth').send({
		email,
		password
	})

	const { token } = authResponse.body
  
	return {
		token
	}
}