export function createCurrencyAndPrice(price: string): string {
  return `$${price}`;
}

export function createProvisionalId() {
  const date = new Date();
  const comb1 = date.getMilliseconds().toString();
  const comb2 = Math.random().toString(36).substring(2, 8);
  return `${comb1}-${comb2}`;
}
