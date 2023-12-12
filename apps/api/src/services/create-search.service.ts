import { AccountsRepository } from '@/repositories/accounts.repository'
import { SearchesRepository } from '@/repositories/searches.repository'
import { sanitizeText } from '@/utils/format-text'
import { ResourceNotFound } from './errors/resource-not-found.error'
import { UsersRepository } from '@/repositories/users.repository'
import { Repositories } from '@/@types/accounts'
import { AccountNotFound } from './errors/account-not-found.error'

type CreateSearchServiceRequest = {
  userId: string,
  username: string
}

type CreateSearchServiceResponse = {
	username: string
  repositories: Repositories
}

export class CreateSearchService {
	constructor(readonly usersRepository: UsersRepository,readonly searchesRepository: SearchesRepository, readonly accountsRepository: AccountsRepository) {}

	async execute({ userId, username }: CreateSearchServiceRequest): Promise<CreateSearchServiceResponse> {
		const user = await this.usersRepository.getById(userId)

		if(!user) {
			throw new ResourceNotFound()
		}
		
		const formatedUsername = sanitizeText(username)
		const repositories = await this.accountsRepository.getAllRepositoriesByUsername(formatedUsername)

		if(!repositories) {
			await this.searchesRepository.create({
				userId,
				repositories: null,
				username: formatedUsername
			})

			throw new AccountNotFound()
		}

		await this.searchesRepository.create({
			userId,
			repositories: repositories.length,
			username: formatedUsername
		})

		return {
			username: formatedUsername,
			repositories
		}
	}
}