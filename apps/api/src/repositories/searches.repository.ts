import { Prisma, Search } from '@prisma/client'

export type SearchesRepository = {
  create(data: Prisma.SearchUncheckedCreateInput): Promise<Search>
  getAllSearchesByUser(userId: string): Promise<Search[] | null>
  deleteSearch(searchId: string): Promise<Search | null>
}