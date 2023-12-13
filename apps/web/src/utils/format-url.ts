export const formatUrl = (text: string) => {
	try {
		const format = new URL(text)
		return format.href
	} catch (error) {
		const format = `https://${text}`
		const url = new URL(format)

		return url.href
	}
}