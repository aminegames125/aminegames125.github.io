const month = new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" });

export function formatMonth(iso: string): string {
  return month.format(new Date(iso));
}
