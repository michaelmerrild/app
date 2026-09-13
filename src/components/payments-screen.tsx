import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import type { ReactNode } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";
import { demoTenancy } from "@/data/demo";
import { formatBaht, payments } from "@/data/payments";

export function PaymentPage({
  title,
  onBack,
  children,
}: {
  title: string;
  onBack: () => void;
  children: ReactNode;
}) {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={onBack}
          style={({ pressed }) => [styles.back, pressed && styles.pressed]}
        >
          <Ionicons name="chevron-back" size={26} color={colors.purple} />
        </Pressable>
        <Text accessibilityRole="header" style={styles.headerTitle}>
          {title}
        </Text>
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={styles.content}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function PaymentsScreen() {
  const { rent } = demoTenancy;
  return (
    <PaymentPage
      title="Payments"
      onBack={() => (router.canGoBack() ? router.back() : router.replace("/"))}
    >
      <View style={styles.duePanel}>
        <Text style={styles.secondary}>Amount due</Text>
        <Text style={styles.amount}>{formatBaht(rent.amount)}</Text>
        <Text style={styles.secondary}>
          {rent.period} · Due {rent.dueDate}
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={() =>
            router.push({
              pathname: "/[section]",
              params: { section: "pay-rent" },
            })
          }
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        >
          <Text style={styles.buttonText}>Pay rent</Text>
        </Pressable>
      </View>
      <Text accessibilityRole="header" style={styles.heading}>
        Previous payments
      </Text>
      {payments.map((payment) => (
        <Pressable
          key={payment.id}
          accessibilityRole="button"
          accessibilityLabel={`${payment.month} ${payment.year}, ${formatBaht(payment.amount)}, ${payment.status}. View receipt`}
          onPress={() =>
            router.push({
              pathname: "/receipt/[id]",
              params: { id: payment.id },
            })
          }
          style={({ pressed }) => [styles.row, pressed && styles.pressed]}
        >
          <View style={styles.rowMain}>
            <Text style={styles.rowTitle}>
              {payment.month} {payment.year}
            </Text>
            <Text style={styles.secondary}>Rent</Text>
          </View>
          <View style={styles.rowEnd}>
            <Text style={styles.rowTitle}>{formatBaht(payment.amount)}</Text>
            <Text style={styles.paid}>{payment.status}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.secondary} />
        </Pressable>
      ))}
    </PaymentPage>
  );
}

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  back: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 19, fontWeight: "600", color: colors.text },
  content: { padding: 22, paddingBottom: 36 },
  duePanel: {
    backgroundColor: colors.lavender,
    padding: 24,
    borderRadius: 18,
    marginTop: 6,
  },
  secondary: { fontSize: 14, lineHeight: 22, color: colors.secondary },
  amount: {
    fontSize: 38,
    lineHeight: 48,
    fontWeight: "700",
    letterSpacing: -1.3,
    color: colors.text,
    marginVertical: 8,
    fontVariant: ["tabular-nums"],
  },
  button: {
    backgroundColor: colors.purple,
    borderRadius: 14,
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "600" },
  heading: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "600",
    marginTop: 32,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
    paddingVertical: 22,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowMain: { flex: 1, gap: 5 },
  rowEnd: { alignItems: "flex-end", gap: 5 },
  rowTitle: {
    fontSize: 16,
    lineHeight: 23,
    fontWeight: "600",
    color: colors.text,
  },
  paid: { fontSize: 14, lineHeight: 22, color: "#27704F", fontWeight: "500" },
  pressed: { opacity: 0.65 },
});
