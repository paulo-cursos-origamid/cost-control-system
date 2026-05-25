export function getInvoiceReference(
  purchaseDate: Date,
  closingDay: number,
): string {
  const date = new Date(purchaseDate);

  if (date.getDate() > closingDay) {
    date.setMonth(date.getMonth() + 1);
  }

  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, '0');

  return `${year}-${month}`;
}
