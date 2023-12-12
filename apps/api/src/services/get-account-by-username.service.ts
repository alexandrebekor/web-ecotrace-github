import { AccountsRepository } from '@/repositories/accounts.repository'
import { sanitizeText } from '@/utils/format-text'
import { Account } from '@/@types/accounts'
import { AccountNotFound } from './errors/account-not-found.error'

type GetAccountByUsernameServiceRequest = {
  username: string
}

type GetAccountByUsernameServiceResponse = {
  account: Account
}

export class GetAccountByUsernameService {
	constructor(readonly accountsRepository: AccountsRepository) {}

	async execute({ username }: GetAccountByUsernameServiceRequest): Promise<GetAccountByUsernameServiceResponse> {
		const formattedUsername = sanitizeText(username)
		const account = await this.accountsRepository.getByUsername(formattedUsername)

		if(!account) {
			throw new AccountNotFound()
		}

		return {
			account
		}
	}
}