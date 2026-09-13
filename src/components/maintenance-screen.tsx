import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { PaymentPage } from "@/components/payments-screen";
import { colors } from "@/constants/theme";
import { useMaintenance } from "@/state/maintenance";
export function MaintenanceScreen() {
  const { tickets } = useMaintenance();
  const [filter, setFilter] = useState("Active");
  const visible = tickets.filter(
    (t) =>
      filter === "All" ||
      (filter === "Completed"
        ? t.status === "Completed"
        : t.status !== "Completed"),
  );
  return (
    <PaymentPage
      title="Maintenance"
      onBack={() => (router.canGoBack() ? router.back() : router.replace("/"))}
    >
      <Pressable
        accessibilityRole="button"
        onPress={() => router.push("/report-issue")}
        style={({ pressed }) => [
          maintenanceStyles.button,
          pressed && { opacity: 0.65 },
        ]}
      >
        <Ionicons name="add" size={22} color="white" />
        <Text style={maintenanceStyles.buttonText}>Report an issue</Text>
      </Pressable>
      <View style={styles.filters}>
        {["Active", "Completed", "All"].map((item) => (
          <Pressable
            key={item}
            accessibilityRole="button"
            accessibilityState={{ selected: filter === item }}
            onPress={() => setFilter(item)}
            style={[styles.filter, filter === item && styles.selected]}
          >
            <Text
              style={{
                color: filter === item ? colors.purple : colors.secondary,
                fontWeight: "600",
              }}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
      {visible.length === 0 && (
        <Text style={maintenanceStyles.copy}>
          No {filter.toLowerCase()} issues to show.
        </Text>
      )}
      {visible.map((ticket) => (
        <Pressable
          key={ticket.id}
          accessibilityRole="button"
          onPress={() =>
            router.push({ pathname: "/issue/[id]", params: { id: ticket.id } })
          }
          style={({ pressed }) => [styles.ticket, pressed && { opacity: 0.65 }]}
        >
          <View style={{ flex: 1, gap: 7 }}>
            <Text style={maintenanceStyles.title}>{ticket.title}</Text>
            <Text style={maintenanceStyles.copy}>
              Reported {ticket.reported}
            </Text>
            <Text style={maintenanceStyles.status}>{ticket.status}</Text>
            {ticket.appointment && (
              <Text style={maintenanceStyles.copy}>{ticket.appointment}</Text>
            )}
          </View>
          <Ionicons name="chevron-forward" size={19} color={colors.secondary} />
        </Pressable>
      ))}
    </PaymentPage>
  );
}
export const maintenanceStyles = StyleSheet.create({
  button: {
    flexDirection: "row",
    gap: 8,
    minHeight: 52,
    backgroundColor: colors.purple,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  buttonText: { fontSize: 16, fontWeight: "600", color: "white" },
  title: {
    fontSize: 17,
    lineHeight: 25,
    fontWeight: "600",
    color: colors.text,
  },
  copy: { fontSize: 14, lineHeight: 22, color: colors.secondary },
  status: {
    color: colors.purple,
    fontSize: 13,
    lineHeight: 21,
    fontWeight: "600",
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
    marginTop: 28,
    marginBottom: 12,
  },
});
const styles = StyleSheet.create({
  filters: { flexDirection: "row", gap: 8, marginTop: 18, marginBottom: 8 },
  filter: {
    minHeight: 44,
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 22,
  },
  selected: { backgroundColor: colors.lavender },
  ticket: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 22,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
});
