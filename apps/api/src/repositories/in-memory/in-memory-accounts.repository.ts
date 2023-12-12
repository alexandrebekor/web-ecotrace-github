import { Account, Repositories } from '@/@types/accounts'
import { AccountsRepository } from '../accounts.repository'

export class InMemoryAccountsRepository implements AccountsRepository {
	async findByUsername(username: string): Promise<Account | null> {
		if(username === 'usernamewrong') {
			return null
		}
		
		return {
			'login': username,
			'id': 0,
			'node_id': '',
			'avatar_url': '',
			'url': '',
			'html_url': '',
			'followers_url': '',
			'following_url': '',
			'gists_url': '',
			'starred_url': '',
			'subscriptions_url': '',
			'organizations_url': '',
			'repos_url': '',
			'events_url': '',
			'received_events_url': '',
			'type': '',
			'site_admin': false,
			'name': null,
			'company': null,
			'blog': '',
			'location': null,
			'email': null,
			'hireable': null,
			'bio': null,
			'twitter_username': null,
			'public_repos': 0,
			'public_gists': 0,
			'followers': 0,
			'following': 0,
			'created_at': new Date().toString(),
			'updated_at': new Date().toString()
		}
	}

	async getRepositories(username: string): Promise<Repositories | null> {
		if(username === 'usernamewrong') {
			return null
		}

		return []
	}
}