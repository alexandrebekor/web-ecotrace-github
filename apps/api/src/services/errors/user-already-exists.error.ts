export class UserAlreadyExists extends Error {
	constructor() {
		super('User with this email already exists')
	}
}