import Ionicons from "@expo/vector-icons/Ionicons";
import { Asset } from "expo-asset";
import { router } from "expo-router";
import * as Sharing from "expo-sharing";
import { useState } from "react";
import {
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PaymentPage } from "@/components/payments-screen";
import { colors } from "@/constants/theme";
import { demoTenancy } from "@/data/demo";
import { formatBaht } from "@/data/payments";
import {
  daysRemaining,
  lease,
  leaseDate,
  renewalAvailable,
} from "@/data/tenancy";

export function TenancyScreen() {
  const [opening, setOpening] = useState(false);
  const [error, setError] = useState("");
  const contact = (reason: string) =>
    router.push({ pathname: "/contact", params: { reason, from: "tenancy" } });
  const openAgreement = async () => {
    if (opening) return;
    setOpening(true);
    setError("");
    try {
      const asset = Asset.fromModule(
        require("../../assets/documents/sample-lease.pdf"),
      );
      if (Platform.OS === "web") {
        await Linking.openURL(asset.uri);
      } else {
        if (!(await Sharing.isAvailableAsync()))
          throw new Error("Sharing unavailable");
        await asset.downloadAsync();
        await Sharing.shareAsync(asset.localUri ?? asset.uri, {
          mimeType: "application/pdf",
          UTI: "com.adobe.pdf",
          dialogTitle: "Open lease agreement",
        });
      }
    } catch {
      setError("Couldn’t open the agreement. Please try again.");
    } finally {
      setOpening(false);
    }
  };
  return (
    <PaymentPage
      title="Tenancy details"
      onBack={() => (router.canGoBack() ? router.back() : router.replace("/"))}
    >
      <Text style={styles.home}>{demoTenancy.building}</Text>
      <Text style={styles.unit}>Unit {demoTenancy.unit}</Text>
      <Text style={styles.muted}>{lease.address}</Text>
      <View style={styles.dates}>
        <View style={styles.dateRow}>
          <Detail label="Lease start date" value={leaseDate(lease.start)} />
          <Detail label="Lease end date" value={leaseDate(lease.end)} />
        </View>
        <Text style={styles.remaining}>
          {daysRemaining > 0
            ? `${daysRemaining} days remaining`
            : daysRemaining === 0
              ? "Lease ends today"
              : "Lease ended"}
        </Text>
      </View>
      <Text style={styles.heading}>Rent & deposit</Text>
      <Row label="Monthly rent" value={formatBaht(demoTenancy.rent.amount)} />
      <Row label="Payment due" value="1st of each month" />
      <Row label="Security deposit" value={formatBaht(lease.deposit)} />
      <Text style={styles.heading}>Tenants</Text>
      {lease.tenants.map((name) => (
        <Text key={name} style={styles.value}>
          {name}
        </Text>
      ))}
      <Text style={styles.heading}>Lease agreement</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open lease agreement PDF"
        disabled={opening}
        onPress={openAgreement}
        style={({ pressed }) => [
          styles.document,
          (pressed || opening) && styles.pressed,
        ]}
      >
        <Ionicons
          name="document-text-outline"
          size={25}
          color={colors.purple}
        />
        <View style={styles.flex}>
          <Text style={styles.value}>{lease.documentName}</Text>
          <Text style={styles.muted}>PDF · Sample document</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.secondary} />
      </Pressable>
      {!!error && (
        <Text accessibilityRole="alert" style={styles.error}>
          {error}
        </Text>
      )}
      {renewalAvailable && (
        <View style={styles.renewal}>
          <Text style={styles.renewalTitle}>Want to renew?</Text>
          <Text style={styles.muted}>
            Your lease ends on {leaseDate(lease.end)}. Let’s talk about staying.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => contact("Lease renewal")}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          >
            <Text style={styles.buttonText}>Contact Lamun</Text>
          </Pressable>
        </View>
      )}
      <Pressable
        accessibilityRole="button"
        onPress={() => contact("My tenancy")}
        style={({ pressed }) => [styles.help, pressed && styles.pressed]}
      >
        <Text style={styles.link}>Questions about your tenancy?</Text>
      </Pressable>
    </PaymentPage>
  );
}
function Detail({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.flex}>
      <Text style={styles.muted}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.muted, styles.flex]}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  home: { fontSize: 25, fontWeight: "600", color: colors.text, marginTop: 8 },
  unit: { fontSize: 17, color: colors.text, marginTop: 6, marginBottom: 10 },
  muted: { fontSize: 14, lineHeight: 22, color: colors.secondary },
  value: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
    fontWeight: "500",
  },
  flex: { flex: 1 },
  dates: {
    padding: 20,
    backgroundColor: colors.lavender,
    borderRadius: 16,
    marginTop: 24,
  },
  dateRow: { flexDirection: "row", gap: 16 },
  remaining: {
    color: colors.purple,
    fontSize: 13,
    fontWeight: "500",
    marginTop: 16,
  },
  heading: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowValue: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
    fontWeight: "500",
    textAlign: "right",
    flex: 1,
  },
  document: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minHeight: 60,
  },
  link: {
    color: colors.purple,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "600",
    textAlign: "center",
  },
  renewal: {
    marginTop: 30,
    padding: 20,
    borderRadius: 16,
    backgroundColor: colors.lavender,
    gap: 8,
  },
  renewalTitle: { fontSize: 20, fontWeight: "600", color: colors.text },
  button: {
    backgroundColor: colors.purple,
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: { color: "white", fontWeight: "600", fontSize: 16 },
  pressed: { opacity: 0.6 },
  help: { paddingVertical: 22, minHeight: 48 },
  error: { color: "#B53B51", fontSize: 14, marginTop: 12 },
});
