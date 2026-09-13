import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/theme";
import { demoTenancy } from "@/data/demo";

// Sample choices for the UI preview; provider availability is not integrated yet.
const banks = [
  { id: "kbank", name: "Kasikornbank", initials: "K", color: "#16874B" },
  {
    id: "scb",
    name: "Siam Commercial Bank",
    initials: "SCB",
    color: "#4C2778",
  },
  { id: "bbl", name: "Bangkok Bank", initials: "BBL", color: "#174A94" },
  { id: "bay", name: "Krungsri", initials: "BAY", color: "#80641B" },
];

export function PayRentScreen() {
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [showPaymentNotice, setShowPaymentNotice] = useState(false);
  const { rent } = demoTenancy;

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/")
          }
          style={styles.back}
        >
          <Ionicons name="chevron-back" size={26} color={colors.purple} />
        </Pressable>
        <Text accessibilityRole="header" style={styles.headerTitle}>
          Pay rent
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.amountCard}>
          <Text style={styles.period}>{rent.period}</Text>
          <Text style={styles.amount}>
            ฿{rent.amount.toLocaleString("en-US")}
          </Text>
          <Text style={styles.due}>Due {rent.dueDate}</Text>
        </View>
        <Text accessibilityRole="header" style={styles.title}>
          Choose your bank
        </Text>
        <View style={styles.banks}>
          {banks.map((bank, index) => {
            const selected = selectedBank === bank.id;
            return (
              <Pressable
                key={bank.id}
                accessibilityRole="radio"
                accessibilityLabel={bank.name}
                accessibilityState={{ checked: selected }}
                onPress={() => {
                  setSelectedBank(bank.id);
                  setShowPaymentNotice(false);
                }}
                style={({ pressed }) => [
                  styles.bank,
                  index > 0 && styles.divider,
                  selected && styles.selected,
                  pressed && styles.pressed,
                ]}
              >
                <View
                  style={[styles.bankMark, { backgroundColor: bank.color }]}
                >
                  <Text style={styles.bankInitials}>{bank.initials}</Text>
                </View>
                <Text
                  style={[styles.bankName, selected && styles.selectedText]}
                >
                  {bank.name}
                </Text>
                <Ionicons
                  name={selected ? "radio-button-on" : "radio-button-off"}
                  size={23}
                  color={selected ? colors.purple : "#B8BAC6"}
                />
              </Pressable>
            );
          })}
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: !selectedBank }}
          disabled={!selectedBank}
          onPress={() => setShowPaymentNotice(true)}
          style={({ pressed }) => [
            styles.payButton,
            !selectedBank && styles.payButtonDisabled,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.payButtonText}>Pay now</Text>
        </Pressable>
        {showPaymentNotice && (
          <Text accessibilityRole="alert" style={styles.paymentNotice}>
            Payments aren’t available in this preview. No payment has been made.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  amountCard: {
    backgroundColor: colors.lavender,
    padding: 24,
    borderRadius: 18,
    marginTop: 6,
  },
  period: { color: colors.secondary, fontSize: 15, lineHeight: 22 },
  amount: {
    color: colors.text,
    fontSize: 38,
    lineHeight: 48,
    fontWeight: "700",
    letterSpacing: -1.3,
    marginTop: 8,
    fontVariant: ["tabular-nums"],
  },
  due: { color: colors.secondary, fontSize: 14, lineHeight: 21, marginTop: 4 },
  title: {
    color: colors.text,
    fontSize: 22,
    lineHeight: 29,
    fontWeight: "600",
    letterSpacing: -0.5,
    marginTop: 32,
    marginBottom: 18,
  },
  banks: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: "hidden",
  },
  bank: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 18,
    minHeight: 80,
  },
  divider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  selected: { backgroundColor: colors.iconBackground },
  pressed: { opacity: 0.7 },
  bankMark: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  bankInitials: { color: "white", fontSize: 12, fontWeight: "700" },
  bankName: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "500",
    color: colors.text,
  },
  selectedText: { color: colors.purple },
  payButton: {
    backgroundColor: colors.purple,
    borderRadius: 16,
    minHeight: 56,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  payButtonDisabled: { opacity: 0.4 },
  payButtonText: { color: "white", fontSize: 16, fontWeight: "600" },
  paymentNotice: {
    color: colors.secondary,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 16,
  },
});
