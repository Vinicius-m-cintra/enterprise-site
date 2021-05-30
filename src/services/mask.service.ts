export const maskPhoneNumber = (value: any) =>
	value
		.replace(/\D/g, '')
		.replace(/(\d{2})(\d)/, '($1) $2')
		.replace(/(\d{4,5})(\d{4})/, '$1-$2');

export const unmaskPhoneNumber = (value: any) => value.replace(/\D/g, '');