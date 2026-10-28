const packed = process.env.NEXT_PUBLIC_CONTACT_KEY ?? "";

/** True when the build was given a webhook. Without one the form shows a fallback instead. */
export const contactConnected = packed !== "";

/** Reverses the packing done in next.config.ts. */
export function webhookUrl(): string {
  return packed
    .split(".")
    .reverse()
    .map((chunk) => atob(chunk))
    .join("");
}
