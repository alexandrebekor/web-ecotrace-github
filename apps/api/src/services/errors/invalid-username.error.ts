export class InvalidUsername extends Error {
	constructor() {
		super('Username not found')
	}
}