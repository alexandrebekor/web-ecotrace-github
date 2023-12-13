export const sanitizeText = (text: string) => {
	const textToLowerCase = text.toLocaleLowerCase()
	const removeSpacesAndSpecialCharacteres = textToLowerCase.replace(/[^\w\s]| /g, '')

	return removeSpacesAndSpecialCharacteres
}