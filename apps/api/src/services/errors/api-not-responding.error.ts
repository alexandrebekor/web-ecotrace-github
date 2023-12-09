export class ApiNotResponding extends Error {
	constructor() {
		super('API is not responding')
	}
}