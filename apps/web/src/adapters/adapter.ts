type Adapter = {
	get(path: string, token?: string, init?: RequestInit): Promise<Response>
	post(path: string, data: any, token?: string, init?: RequestInit): Promise<Response>
	put(path: string, data: any, token?: string, init?: RequestInit): Promise<Response>
	delete(path: string, token?: string, init?: RequestInit): Promise<Response>
}