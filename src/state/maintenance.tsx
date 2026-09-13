import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
export const categories = [
  "Air conditioning",
  "Plumbing",
  "Electrical",
  "Appliances",
  "Other",
] as const;
export type Ticket = {
  id: string;
  title: string;
  category: string;
  description: string;
  reported: string;
  status: "Reported" | "In progress" | "Appointment scheduled" | "Completed";
  availability: string;
  access: string;
  photos: string[];
  appointment?: string;
  chatId?: string;
  updates: { date: string; text: string }[];
};
const initialTickets: Ticket[] = [
  {
    id: "MT-1042",
    title: "Air conditioning not cooling",
    category: "Air conditioning",
    description:
      "The bedroom air conditioner runs, but the air stays warm even at the lowest temperature.",
    reported: "11 Sep 2026",
    status: "Appointment scheduled",
    availability: "Weekday mornings",
    access: "I’ll be home to let the technician in.",
    photos: [],
    appointment: "16 Sep 2026 · 10:00–12:00",
    chatId: "technician",
    updates: [
      {
        date: "15 Sep 2026",
        text: "Appointment confirmed for 16 Sep, 10:00–12:00.",
      },
      { date: "12 Sep 2026", text: "Lamun is coordinating with a technician." },
      { date: "11 Sep 2026", text: "Issue reported." },
    ],
  },
  {
    id: "MT-1038",
    title: "Kitchen tap leaking",
    category: "Plumbing",
    description:
      "Water drips from the base of the kitchen tap when it is running.",
    reported: "10 Sep 2026",
    status: "In progress",
    availability: "After 14:00",
    access: "Please call before arriving.",
    photos: [],
    updates: [
      {
        date: "12 Sep 2026",
        text: "Lamun is arranging a plumber. Appointment to be confirmed.",
      },
      { date: "10 Sep 2026", text: "Issue reported." },
    ],
  },
  {
    id: "MT-1011",
    title: "Washing machine not draining",
    category: "Appliances",
    description: "The washing machine stops before the spin cycle.",
    reported: "18 Aug 2026",
    status: "Completed",
    availability: "",
    access: "",
    photos: [],
    updates: [
      {
        date: "21 Aug 2026",
        text: "Drain filter cleared and machine tested. Repair completed.",
      },
      { date: "18 Aug 2026", text: "Issue reported." },
    ],
  },
];
type Report = Pick<
  Ticket,
  "title" | "category" | "description" | "availability" | "access" | "photos"
>;
const Context = createContext<{
  tickets: Ticket[];
  report: (data: Report) => string;
  linkChat: (id: string, chatId: string) => void;
} | null>(null);
export function MaintenanceProvider({ children }: PropsWithChildren) {
  const [tickets, setTickets] = useState(initialTickets);
  const report = (data: Report) => {
    const id = `MT-${Date.now()}`;
    const date = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    setTickets((current) => [
      {
        ...data,
        id,
        status: "Reported",
        reported: date,
        updates: [
          { date, text: "Issue reported. Lamun will review the details." },
        ],
      },
      ...current,
    ]);
    return id;
  };
  const linkChat = (id: string, chatId: string) =>
    setTickets((current) =>
      current.map((ticket) =>
        ticket.id === id ? { ...ticket, chatId } : ticket,
      ),
    );
  return (
    <Context.Provider value={{ tickets, report, linkChat }}>
      {children}
    </Context.Provider>
  );
}
export function useMaintenance() {
  const value = useContext(Context);
  if (!value) throw new Error("MaintenanceProvider missing");
  return value;
}
