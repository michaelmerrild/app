import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/theme";
import type { RentReminder as RentReminderData } from "@/data/demo";

export function RentReminder({ rent }: { rent: RentReminderData }) {
  if (rent.status !== "due") return null;
  return (
    <View style={styles.card}>
      <View style={styles.details}>
        <Text style={styles.period}>{rent.period}</Text>
        <Text style={styles.amount}>
          ฿{rent.amount.toLocaleString("en-US")}
        </Text>
        <Text style={styles.due}>Due {rent.dueDate}</Text>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Pay rent"
        onPress={() =>
          router.push({
            pathname: "/[section]",
            params: { section: "pay-rent" },
          })
        }
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>Pay rent</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.iconBackground,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  details: { flex: 1 },
  period: { fontSize: 13, lineHeight: 19, color: colors.secondary },
  amount: {
    color: colors.text,
    fontSize: 27,
    lineHeight: 34,
    fontWeight: "700",
    letterSpacing: -0.7,
    marginTop: 2,
    fontVariant: ["tabular-nums"],
  },
  due: { color: colors.secondary, fontSize: 12, lineHeight: 18, marginTop: 2 },
  button: {
    minHeight: 46,
    borderRadius: 12,
    backgroundColor: colors.purple,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  buttonPressed: {
    backgroundColor: colors.purplePressed,
    transform: [{ scale: 0.985 }],
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "600",
  },
});
