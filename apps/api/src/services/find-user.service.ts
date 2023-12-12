import { AccountsRepository } from '@/repositories/accounts.repository'
import { sanitizeText } from '@/utils/format-text'
import { Account } from '@/@types/accounts'
import { ResourceNotFound } from './errors/resource-not-found.error'

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
			throw new ResourceNotFound()
		}

		return {
			account
		}
	}
}