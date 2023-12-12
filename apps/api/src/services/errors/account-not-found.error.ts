export class AccountNotFound extends Error {
	constructor() {
		super('This username is not found')
	}
}