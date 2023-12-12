import { UsersRepository } from '@/repositories/users.repository'
import { User } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found.error'

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
	constructor(readonly usersRepository: UsersRepository) {}

	async execute({ userId, email, username, password }: UpdateUserServiceRequest): Promise<UpdateUserServiceResponse> {
		const user = await this.usersRepository.findById(userId)

		if(!user) {
			throw new ResourceNotFound()
		}

		throw new Error('')
	}
}