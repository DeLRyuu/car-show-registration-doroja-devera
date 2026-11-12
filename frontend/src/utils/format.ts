// Shows money : ₱2,500.00
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value);
}