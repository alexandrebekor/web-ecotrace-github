import { UsersRepository } from '@/repositories/users.repository'
import { User } from '@prisma/client'

import { hash } from 'bcryptjs'
import { UserAlreadyExists } from './errors/user-already-exists.error'
import { AccountsRepository } from '@/repositories/accounts.repository'
import { InvalidUsername } from './errors/invalid-username.error'

type SignInServiceRequest = {
  username: string
  email: string
  password: string
}

type SignInServiceResponse = {
  user: User | null
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
			throw new InvalidUsername()
		}

		const password_hash = await hash(password, 6)

		const user = await this.usersRepository.create({
			username,
			email,
			password: password_hash,
			name: userAccount.name ?? null,
			followers: userAccount.followers ?? null,
			following: userAccount.following ?? null,
			repositories: userAccount.public_repos ?? null,
			bio: userAccount.bio ?? null,
			twitter_username: userAccount.twitter_username ?? null,
			company: userAccount.company ?? null,
			site: userAccount.blog ?? null,
			avatar_url: userAccount.avatar_url ?? null
		})

		return { user }
	}
}