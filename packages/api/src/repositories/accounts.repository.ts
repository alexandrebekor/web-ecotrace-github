import { RepositoriesGithub, UserGithub } from '@/types/Github'

export type AccountsRepository = {
	findByUsername(username: string): Promise<UserGithub>
	getRepositories(username: string): Promise<RepositoriesGithub>
}