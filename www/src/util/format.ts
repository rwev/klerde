export function formatNumber(x: number): string {
	return x.toLocaleString('en-US', {
		minimumFractionDigits: 3,
		maximumFractionDigits: 3
	});
}