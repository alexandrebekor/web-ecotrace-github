import { UsersRepository } from '@/repositories/users.repository'
import { User } from '@prisma/client'

import { hash } from 'bcryptjs'
import { UserAlreadyExists } from './errors/user-already-exists.error'
import { UsernameNotFound } from './errors/username-not-found.error'
import { AccountsRepository } from '@/repositories/accounts.repository'

type SignInServiceRequest = {
  username: string
  email: string
  password: string
}

type SignInServiceResponse = {
  user: User
}

export class SignInService {
	constructor(readonly usersRepository: UsersRepository, readonly accountsRepository: AccountsRepository) {}

	async execute ({ username, email, password }: SignInServiceRequest): Promise<SignInServiceResponse> {
		const hasUserWithThisEmail = await this.usersRepository.findByEmail(email)

		if(hasUserWithThisEmail) {
			throw new UserAlreadyExists()
		}

		const userAccount = await this.accountsRepository.findByUsername(username)

		if(!userAccount) {
			throw new UsernameNotFound()
		}

		const password_hash = await hash(password, 6)

		const user = await this.usersRepository.create({
			username,
			email,
			password: password_hash
		})

		return { user }
	}
}