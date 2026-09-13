export const contactReasons = [
  "Rent and payments",
  "Maintenance follow-up",
  "Lease renewal",
  "My tenancy",
  "Home services",
  "Something else",
] as const;
export type ContactReason = (typeof contactReasons)[number];
export function validateContact(
  reason: string,
  subject: string,
  message: string,
) {
  return {
    reason: contactReasons.some((item) => item === reason)
      ? ""
      : "Please choose a reason.",
    subject: !subject.trim()
      ? "Please add a subject."
      : subject.trim().length > 100
        ? "Keep the subject under 100 characters."
        : "",
    message: !message.trim()
      ? "Please write a message."
      : message.trim().length > 4000
        ? "Keep the message under 4,000 characters."
        : "",
  };
}
