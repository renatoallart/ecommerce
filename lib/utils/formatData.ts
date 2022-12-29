export function formatToCurrency(currency: number): string {
  return currency.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
