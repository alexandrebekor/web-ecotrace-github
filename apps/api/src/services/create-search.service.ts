import { AccountsRepository } from '@/repositories/accounts.repository'
import { SearchesRepository } from '@/repositories/searches.repository'
import { sanitizeText } from '@/utils/format-text'
import { ResourceNotFound } from './errors/resource-not-found.error'
import { UsersRepository } from '@/repositories/users.repository'
import { Repositories } from '@/@types/accounts'

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
		const user = await this.usersRepository.findById(userId)

		if(!user) {
			throw new ResourceNotFound()
		}
		
		const formatedUsername = sanitizeText(username)
		const repositories = await this.accountsRepository.getRepositories(formatedUsername)

		if(!repositories) {
			await this.searchesRepository.create({
				userId,
				repositories: null,
				username: formatedUsername
			})

			throw new ResourceNotFound()
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