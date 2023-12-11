import { AccountsRepository } from '@/repositories/accounts.repository'
import { sanitizeText } from '@/utils/format-text'
import { InvalidUsername } from './errors/invalid-username.error'
import { Account } from '@/types/accounts'

type FindUserServiceRequest = {
  username: string
}

type FindUserServiceResponse = {
  account: Account
}

export class FindUserService {
	constructor(readonly accountsRepository: AccountsRepository) {}

	async execute({ username }: FindUserServiceRequest): Promise<FindUserServiceResponse> {
		const formattedUsername = sanitizeText(username)
		const account = await this.accountsRepository.findByUsername(formattedUsername)

		if(!account) {
			throw new InvalidUsername()
		}

		return {
			account
		}
	}
}