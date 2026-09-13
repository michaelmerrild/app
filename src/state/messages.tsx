import {
  createContext,
  useCallback,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import {
  initialInbox,
  initialMessages,
  readEntry,
  unreadChatCount,
  type InboxEntry,
  type ChatMessage,
} from "@/data/inbox";

type MessagesState = {
  entries: InboxEntry[];
  messagesByThread: Record<string, ChatMessage[]>;
  unreadCount: number;
  markRead: (id: string) => void;
  send: (id: string, text: string) => void;
  contact: (
    reason: string,
    subject: string,
    message: string,
    maintenanceId?: string,
  ) => string;
};
const MessagesContext = createContext<MessagesState | null>(null);

export function MessagesProvider({ children }: PropsWithChildren) {
  const [entries, setEntries] = useState(initialInbox);
  const [messagesByThread, setMessages] = useState<
    Record<string, ChatMessage[]>
  >({ technician: initialMessages });
  const markRead = useCallback(
    (id: string) => setEntries((current) => readEntry(current, id)),
    [],
  );
  const send = useCallback((id: string, value: string) => {
    const text = value.trim();
    if (!text) return;
    const now = new Date();
    setMessages((current) => ({
      ...current,
      [id]: [
        ...(current[id] ?? []),
        {
          id: `${now.getTime()}-${current[id]?.length ?? 0}`,
          text,
          outgoing: true,
          time: now.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
    }));
    setEntries((current) => {
      const thread = current.find((entry) => entry.id === id)!;
      return [
        { ...thread, preview: `You: ${text}`, time: "Now", unread: 0 },
        ...current.filter((entry) => entry.id !== id),
      ];
    });
  }, []);
  const contact = useCallback(
    (
      reason: string,
      subject: string,
      message: string,
      maintenanceId?: string,
    ) => {
      const id = `contact-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const time = new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setEntries((current) => [
        {
          id,
          kind: "chat",
          title: subject.trim(),
          preview: message.trim()
            ? `You: ${message.trim()}`
            : "No messages yet",
          time: "Now",
          unread: 0,
          reason,
          maintenanceId,
        },
        ...current,
      ]);
      setMessages((current) => ({
        ...current,
        [id]: message.trim()
          ? [{ id: `${id}-first`, text: message.trim(), outgoing: true, time }]
          : [],
      }));
      return id;
    },
    [],
  );
  return (
    <MessagesContext.Provider
      value={{
        entries,
        messagesByThread,
        contact,
        unreadCount: unreadChatCount(entries),
        markRead,
        send,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  const state = useContext(MessagesContext);
  if (!state) throw new Error("MessagesProvider is missing");
  return state;
}
