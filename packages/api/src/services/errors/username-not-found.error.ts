export class UsernameNotFound extends Error {
	constructor() {
		super('Username not found')
	}
}