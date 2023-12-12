import { Prisma, Search } from '@prisma/client'

export type SearchesRepository = {
  create(data: Prisma.SearchUncheckedCreateInput): Promise<Search>
  getAllByUser(userId: string): Promise<Search[]>
  delete(id: string): Promise<Search | null>
}