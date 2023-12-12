import { Prisma, User } from '@prisma/client'

export type UsersRepository = {
  create(data: Prisma.UserCreateInput): Promise<User>
  getByEmail(email: string): Promise<User | null>
  getById(id: string): Promise<User | null>
}