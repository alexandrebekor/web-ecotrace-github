import { UsersRepository } from '@/repositories/users.repository'
import { User } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found.error'

type GetUserProfileServiceRequest = {
  userId: string
}

type GetUserProfileServiceResponse = {
  user: User
}

export class GetUserProfileService {
	constructor(readonly usersRepository: UsersRepository) {}

	async execute({ userId }: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse> {
		const user = await this.usersRepository.getById(userId)

		if(!user) {
			throw new ResourceNotFound()
		}

		return {
			user
		}
	}
}