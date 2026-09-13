export type RentReminder = {
  amount: number;
  period: string;
  dueDate: string;
  status: "due" | "paid" | "upcoming";
  statusLabel: string;
};

// Deliberately fixed demo state so the approved rent-due design stays reviewable.
// A future billing API will supply the period, due date and status together.
export const demoTenancy = {
  building: "The Lofts Asoke",
  unit: "1804",
  city: "Bangkok",
  tenantInitials: "MK",
  rent: {
    amount: 60000,
    period: "September rent",
    dueDate: "15 Sep 2026",
    status: "due",
    statusLabel: "Due today",
  } satisfies RentReminder,
};
