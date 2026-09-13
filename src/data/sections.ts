import type { ComponentProps } from "react";
import type Ionicons from "@expo/vector-icons/Ionicons";

export type IconName = ComponentProps<typeof Ionicons>["name"];

export const sections = {
  "new-chat": {
    title: "New chat",
    subtitle: "Start a conversation",
    description: "Starting a new conversation will be available here soon.",
    icon: "create-outline",
  },
  maintenance: {
    title: "Maintenance",
    subtitle: "Report and track issues",
    description: "Report an issue and follow its progress with Lamun.",
    icon: "construct-outline",
  },
  payment: {
    title: "Payment",
    subtitle: "Payments and receipts",
    description: "Your payment history and receipts will appear here.",
    icon: "receipt-outline",
  },
  tenancy: {
    title: "Tenancy details",
    subtitle: "Lease and rental information",
    description:
      "Your lease, rental terms and tenancy documents will live here.",
    icon: "document-text-outline",
  },
  building: {
    title: "Building info",
    subtitle: "Facilities, rules and contacts",
    description:
      "Find your building’s facilities, house rules and useful contacts.",
    icon: "business-outline",
  },
  "pay-rent": {
    title: "Pay rent",
    subtitle: "Rent payments",
    description:
      "Rent payment will be available here. No payment can be made in this preview.",
    icon: "wallet-outline",
  },
  profile: {
    title: "Profile",
    subtitle: "Your account",
    description: "Your personal details and app preferences will live here.",
    icon: "person-outline",
  },
} satisfies Record<
  string,
  { title: string; subtitle: string; description: string; icon: IconName }
>;

export type Section = keyof typeof sections;
export const homeMenu: Section[] = [
  "maintenance",
  "payment",
  "tenancy",
  "building",
];
