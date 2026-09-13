// Fixed, illustrative tenancy for the preview. Replace with tenancy API data.
export const lease = {
  address:
    "Unit 1804, 123 Sukhumvit Road, Khlong Toei Nuea, Watthana, Bangkok 10110",
  start: "2025-11-15",
  end: "2026-11-14",
  referenceDate: "2026-09-15",
  deposit: 120000,
  depositHolder: "Landlord",
  tenants: ["Alex Morgan"],
  documentName: "Lease agreement (sample)",
};

export const leaseDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
export const daysRemaining = Math.ceil(
  (Date.parse(lease.end) - Date.parse(lease.referenceDate)) / 86400000,
);
export const renewalAvailable = daysRemaining >= 0 && daysRemaining <= 60;
