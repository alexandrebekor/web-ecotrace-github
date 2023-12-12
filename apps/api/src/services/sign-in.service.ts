import bcryptjs from 'bcryptjs'

import { UsersRepository } from '@/repositories/users.repository'
import { CredentialsInvalid } from './errors/credentials-invalid.error'
import { User } from '@prisma/client'

type SignInServiceRequest = {
  email: string
  password: string
}

type SignInServiceResponse = {
  user: User
}

export class SignInService {
	constructor(readonly usersRepository: UsersRepository){}

	async execute({ email, password }: SignInServiceRequest): Promise<SignInServiceResponse> {
		const user = await this.usersRepository.getByEmail(email)

		if(!user) {
			throw new CredentialsInvalid()
		}

		const isSamePassword = await bcryptjs.compare(password, user.password)

		if(!isSamePassword) {
			throw new CredentialsInvalid()
		}

		return {
			user
		}
	}
}