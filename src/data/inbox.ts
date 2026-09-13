export type InboxEntry = {
  id: string;
  kind: "chat" | "update";
  title: string;
  preview: string;
  time: string;
  unread: number;
  resolved?: boolean;
  reason?: string;
  maintenanceId?: string;
  destination?: "payment" | "tenancy";
};

export type InboxFilters = {
  type: "all" | "chat" | "update";
  unreadOnly: boolean;
  includeResolved: boolean;
};
export const defaultFilters: InboxFilters = {
  type: "all",
  unreadOnly: false,
  includeResolved: false,
};

export const initialInbox: InboxEntry[] = [
  {
    id: "technician",
    maintenanceId: "MT-1042",
    kind: "chat",
    title: "Technician visit",
    preview: "Nina: Would 10:00 tomorrow work?",
    time: "10:42",
    unread: 2,
  },
  {
    id: "receipt",
    kind: "update",
    title: "Rent payment received",
    preview: "Your September receipt is ready.",
    time: "09:15",
    unread: 1,
    destination: "payment",
  },
  {
    id: "key",
    kind: "chat",
    title: "Extra key request",
    preview: "Nina: Your key is ready at reception.",
    time: "Yesterday",
    unread: 1,
    resolved: true,
  },
  {
    id: "renewal",
    kind: "update",
    title: "Thinking of staying?",
    preview: "Your lease ends in 2 months. Let’s talk renewal.",
    time: "Yesterday",
    unread: 0,
    destination: "tenancy",
  },
  {
    id: "move-in",
    kind: "chat",
    title: "Move-in questions",
    preview: "You: Thank you, all sorted!",
    time: "Tuesday",
    unread: 0,
  },
  {
    id: "delivery",
    kind: "chat",
    title: "Delivery instructions",
    preview: "Nina: Happy to help!",
    time: "Monday",
    unread: 0,
    resolved: true,
  },
];

export function filterInbox(entries: InboxEntry[], filters: InboxFilters) {
  return entries.filter(
    (entry) =>
      (filters.type === "all" || entry.kind === filters.type) &&
      (!filters.unreadOnly || entry.unread > 0) &&
      (filters.includeResolved || !entry.resolved || entry.unread > 0),
  );
}

export function unreadChatCount(entries: InboxEntry[]) {
  return entries.reduce(
    (sum, entry) => sum + (entry.kind === "chat" ? entry.unread : 0),
    0,
  );
}

export function readEntry(entries: InboxEntry[], id: string) {
  return entries.map((entry) =>
    entry.id === id ? { ...entry, unread: 0 } : entry,
  );
}

export type ChatMessage = {
  id: string;
  text: string;
  time: string;
  outgoing?: boolean;
};
export const initialMessages: ChatMessage[] = [
  {
    id: "1",
    text: "Hi Michael! We’re arranging a technician for your air conditioning.",
    time: "09:58",
  },
  {
    id: "2",
    text: "Thanks! Tomorrow morning would be ideal.",
    time: "10:03",
    outgoing: true,
  },
  {
    id: "3",
    text: "The technician is available tomorrow morning.",
    time: "10:41",
  },
  {
    id: "4",
    text: "Would 10:00 tomorrow work? The visit should take about an hour.",
    time: "10:42",
  },
];
