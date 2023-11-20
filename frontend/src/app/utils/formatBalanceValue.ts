export function formattedBalanceValue(number: number) {
	const formattedNumber = number.toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: 2,
	});

	return formattedNumber;
}