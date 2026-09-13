import { router, useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { PaymentPage } from "@/components/payments-screen";
import { maintenanceStyles as shared } from "@/components/maintenance-screen";
import { colors } from "@/constants/theme";
import { useMaintenance } from "@/state/maintenance";
import { useMessages } from "@/state/messages";
import NotFoundScreen from "../+not-found";
export default function IssueScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tickets, linkChat } = useMaintenance();
  const { contact } = useMessages();
  const openedChat = useRef<{ ticketId: string; chatId: string } | null>(null);
  const ticket = tickets.find((item) => item.id === id);
  if (!ticket) return <NotFoundScreen />;
  const openChat = () => {
    const chatId =
      ticket.chatId ??
      (openedChat.current?.ticketId === ticket.id
        ? openedChat.current.chatId
        : undefined) ??
      contact("Maintenance follow-up", ticket.title, "", ticket.id);
    openedChat.current = { ticketId: ticket.id, chatId };
    if (!ticket.chatId) linkChat(ticket.id, chatId);
    router.push({ pathname: "/chat/[id]", params: { id: chatId } });
  };
  return (
    <PaymentPage
      title="Maintenance issue"
      onBack={() =>
        router.dismissTo({
          pathname: "/[section]",
          params: { section: "maintenance" },
        })
      }
    >
      <Text style={shared.status}>{ticket.status}</Text>
      <Text style={styles.title}>{ticket.title}</Text>
      <Text style={shared.copy}>
        {ticket.category} · Reported {ticket.reported}
      </Text>
      {ticket.appointment && (
        <View style={styles.appointment}>
          <Text style={shared.status}>Appointment scheduled</Text>
          <Text style={[shared.title, { marginTop: 8 }]}>
            {ticket.appointment}
          </Text>
        </View>
      )}
      <Text style={shared.heading}>Your report</Text>
      <Text style={styles.body}>{ticket.description}</Text>
      {ticket.photos.length > 0 && (
        <View style={styles.photos}>
          {ticket.photos.map((uri, index) => (
            <Image
              accessibilityLabel={`Report photo ${index + 1}`}
              key={uri + index}
              source={{ uri }}
              style={styles.photo}
              resizeMode="contain"
            />
          ))}
        </View>
      )}
      {!!ticket.availability && (
        <>
          <Text style={styles.label}>Preferred visit times</Text>
          <Text style={styles.body}>{ticket.availability}</Text>
        </>
      )}
      {!!ticket.access && (
        <>
          <Text style={styles.label}>Access notes</Text>
          <Text style={styles.body}>{ticket.access}</Text>
        </>
      )}
      <Text style={shared.heading}>Updates</Text>
      {ticket.updates.map((item, index) => (
        <View key={index} style={styles.update}>
          <View style={styles.dot} />
          <View style={{ flex: 1 }}>
            <Text style={shared.copy}>{item.date}</Text>
            <Text style={styles.body}>{item.text}</Text>
          </View>
        </View>
      ))}
      <Pressable
        accessibilityRole="button"
        onPress={openChat}
        style={shared.button}
      >
        <Text style={shared.buttonText}>Message Lamun about this issue</Text>
      </Pressable>
    </PaymentPage>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    lineHeight: 33,
    fontWeight: "600",
    color: colors.text,
    marginVertical: 10,
  },
  appointment: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: colors.lavender,
    marginTop: 24,
  },
  body: { fontSize: 15, lineHeight: 24, color: colors.text },
  label: {
    fontSize: 13,
    color: colors.secondary,
    marginTop: 20,
    marginBottom: 5,
  },
  update: { flexDirection: "row", gap: 12, paddingBottom: 22 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.purple,
    marginTop: 7,
  },
  photos: { gap: 12, marginTop: 18 },
  photo: {
    width: "100%",
    height: 240,
    borderRadius: 12,
    backgroundColor: colors.border,
  },
});
