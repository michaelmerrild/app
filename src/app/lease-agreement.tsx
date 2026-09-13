import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { PaymentPage } from "@/components/payments-screen";
import { colors } from "@/constants/theme";
import { demoTenancy } from "@/data/demo";
import { formatBaht } from "@/data/payments";
import { lease, leaseDate } from "@/data/tenancy";

export default function LeaseAgreement() {
  const rows = [
    ["Property", `${demoTenancy.building} · Unit ${demoTenancy.unit}`],
    ["Sample address", lease.address],
    ["Tenant", lease.tenants.join(", ")],
    ["Lease start", leaseDate(lease.start)],
    ["Lease end", leaseDate(lease.end)],
    ["Monthly rent", formatBaht(demoTenancy.rent.amount)],
    ["Payment due", "1st of each month"],
    [
      "Security deposit",
      `${formatBaht(lease.deposit)} · Held by ${lease.depositHolder.toLowerCase()}`,
    ],
  ];
  return (
    <PaymentPage
      title="Lease agreement"
      onBack={() =>
        router.dismissTo({
          pathname: "/[section]",
          params: { section: "tenancy" },
        })
      }
    >
      <Text style={styles.title}>Lease agreement — sample</Text>
      <Text style={styles.note}>
        Illustrative app preview. Not a signed agreement or legal document.
      </Text>
      {rows.map(([label, value]) => (
        <View key={label} style={styles.row}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      ))}
      <Text style={styles.note}>
        Your signed lease agreement will appear here when available.
      </Text>
    </PaymentPage>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    lineHeight: 33,
    fontWeight: "600",
    color: colors.text,
    marginTop: 8,
  },
  note: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.secondary,
    marginVertical: 20,
  },
  row: {
    paddingVertical: 14,
    gap: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  label: { fontSize: 13, color: colors.secondary },
  value: { fontSize: 16, lineHeight: 24, color: colors.text },
});
