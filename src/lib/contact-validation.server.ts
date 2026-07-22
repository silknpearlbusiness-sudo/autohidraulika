import disposableDomains from "disposable-email-domains";

const disposableSet = new Set(disposableDomains.map((d) => d.toLowerCase()));

// Loose on purpose — accepts international formats, just filters out
// obvious junk like "1234567" or "0000000000".
export function isPlausiblePhone(phone: string): boolean {
  if (!/^[+\d\s().-]+$/.test(phone)) return false;
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) return false;
  if (/^(\d)\1+$/.test(digits)) return false;
  return true;
}

export function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  return !!domain && disposableSet.has(domain);
}
