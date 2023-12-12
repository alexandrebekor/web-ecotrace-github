import { UsersRepository } from '@/repositories/users.repository'
import { User } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found.error'
import bcryptjs from 'bcryptjs'
import { AccountsRepository } from '@/repositories/accounts.repository'
import { AccountNotFound } from './errors/account-not-found.error'
import { sanitizeText } from '@/utils/format-text'

type UpdateUserServiceRequest = {
  userId: string
  email?: string
  username?: string
  password?: string
}

type UpdateUserServiceResponse = {
  user: User
}

export class UpdateUserService {
	constructor(readonly usersRepository: UsersRepository, readonly accountsRepository: AccountsRepository) {}

	async execute({ userId, email, username, password }: UpdateUserServiceRequest): Promise<UpdateUserServiceResponse> {
		const currentUser = await this.usersRepository.getById(userId)

		if(!currentUser) {
			throw new ResourceNotFound()
		}

		let account = null
		if(username) {
			const formatUsername = sanitizeText(username)
			account = await this.accountsRepository.getByUsername(formatUsername)

			if(!account) {
				throw new AccountNotFound()
			}

			account = {
				name: account.name,
				followers: account.followers,
				following: account.following,
				repositories: account.public_repos,
				bio: account.bio,
				twitter_username: account.twitter_username,
				company: account.company,
				site: account.blog,
				avatar_url: account.avatar_url
			}
		}

		const password_hash = password ? await bcryptjs.hash(password, 6) : undefined

		const user = await this.usersRepository.update(userId, {
			email: email ?? currentUser.email,
			username: username ?? currentUser.username,
			password: password_hash ?? currentUser.password,
			...account
		})

		return {
			user
		}
	}
}