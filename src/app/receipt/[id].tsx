import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import {
  PaymentPage,
  styles as paymentStyles,
} from "@/components/payments-screen";
import { colors } from "@/constants/theme";
import { demoTenancy } from "@/data/demo";
import { formatBaht, payments } from "@/data/payments";
import NotFoundScreen from "../+not-found";

export default function ReceiptScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const payment = payments.find((item) => item.id === id);
  if (!payment) return <NotFoundScreen />;
  const details = [
    ["Receipt number", payment.reference],
    ["Property", demoTenancy.building],
    ["Unit", demoTenancy.unit],
    ["Rental period", payment.period],
    ["Payment date", payment.paidAt],
    ["Payment method", "Bank transfer"],
    ["Bank", payment.bank],
  ];
  return (
    <PaymentPage
      title="Receipt"
      onBack={() =>
        router.dismissTo({
          pathname: "/[section]",
          params: { section: "payment" },
        })
      }
    >
      <View style={styles.summary}>
        <Text style={paymentStyles.paid}>{payment.status}</Text>
        <Text style={paymentStyles.amount}>{formatBaht(payment.amount)}</Text>
        <Text style={paymentStyles.secondary}>
          {payment.month} {payment.year} rent
        </Text>
      </View>
      <View style={styles.details}>
        {details.map(([label, value]) => (
          <View key={label} style={styles.detail}>
            <Text style={paymentStyles.secondary}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </View>
      <View style={styles.total}>
        <Text style={paymentStyles.rowTitle}>Total paid</Text>
        <Text style={paymentStyles.rowTitle}>{formatBaht(payment.amount)}</Text>
      </View>
      <Text style={styles.note}>Sample receipt · For preview only</Text>
    </PaymentPage>
  );
}
const styles = StyleSheet.create({
  summary: { alignItems: "center", paddingVertical: 28 },
  details: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 14,
  },
  detail: { gap: 4, paddingVertical: 10 },
  value: {
    fontSize: 16,
    lineHeight: 23,
    fontWeight: "500",
    color: colors.text,
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  note: {
    textAlign: "center",
    color: colors.secondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 12,
  },
});
