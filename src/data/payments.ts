// Illustrative payment history for the tenant app preview.
export const payments = [
  {
    id: "2026-08",
    month: "August",
    year: 2026,
    amount: 60000,
    status: "Paid",
    paidAt: "14 Aug 2026, 10:42",
    period: "1–31 Aug 2026",
    reference: "LM-202608-1804",
    bank: "Kasikornbank",
  },
  {
    id: "2026-07",
    month: "July",
    year: 2026,
    amount: 60000,
    status: "Paid",
    paidAt: "15 Jul 2026, 09:18",
    period: "1–31 Jul 2026",
    reference: "LM-202607-1804",
    bank: "Kasikornbank",
  },
  {
    id: "2026-06",
    month: "June",
    year: 2026,
    amount: 60000,
    status: "Paid",
    paidAt: "14 Jun 2026, 16:05",
    period: "1–30 Jun 2026",
    reference: "LM-202606-1804",
    bank: "Bangkok Bank",
  },
  {
    id: "2026-05",
    month: "May",
    year: 2026,
    amount: 60000,
    status: "Paid",
    paidAt: "15 May 2026, 11:32",
    period: "1–31 May 2026",
    reference: "LM-202605-1804",
    bank: "Kasikornbank",
  },
];

export const formatBaht = (amount: number) =>
  `฿${amount.toLocaleString("en-US")}`;
