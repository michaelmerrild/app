import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useState } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { PaymentPage } from "@/components/payments-screen";
import { colors } from "@/constants/theme";
import { buildingInfo } from "@/data/building";
import { demoTenancy } from "@/data/demo";

function InfoRow({ title, text }: { title: string; text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={styles.infoRow}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        onPress={() => setExpanded(!expanded)}
        style={({ pressed }) => [styles.disclosure, pressed && styles.pressed]}
      >
        <Text style={[styles.rowTitle, styles.flex]}>{title}</Text>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={18}
          color={colors.secondary}
        />
      </Pressable>
      {expanded && <Text style={styles.expandedText}>{text}</Text>}
    </View>
  );
}
export function BuildingScreen() {
  const [error, setError] = useState("");
  const openMap = async () => {
    setError("");
    try {
      await Linking.openURL(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${demoTenancy.building}, Bangkok`)}`,
      );
    } catch {
      setError("Couldn’t open Google Maps. Please try again.");
    }
  };
  return (
    <PaymentPage
      title="Building info"
      onBack={() => (router.canGoBack() ? router.back() : router.replace("/"))}
    >
      <Text style={styles.title}>{demoTenancy.building}</Text>
      <Text style={styles.address}>{buildingInfo.address}</Text>
      <Pressable
        accessibilityRole="link"
        onPress={openMap}
        style={({ pressed }) => [styles.map, pressed && styles.pressed]}
      >
        <Ionicons name="location-outline" size={20} color={colors.purple} />
        <Text style={styles.mapText}>Open in Google Maps</Text>
        <Ionicons name="open-outline" size={17} color={colors.purple} />
      </Pressable>
      {!!error && (
        <Text accessibilityRole="alert" style={styles.copy}>
          {error}
        </Text>
      )}
      <Text style={styles.sample}>
        Sample building information · Last updated {buildingInfo.updated}
      </Text>
      <Text accessibilityRole="header" style={styles.heading}>
        Facilities
      </Text>
      {buildingInfo.facilities.map((item) => (
        <View style={styles.facility} key={item.name}>
          <View style={styles.icon}>
            <Ionicons name={item.icon} size={23} color={colors.purple} />
          </View>
          <View style={styles.flex}>
            <View style={styles.facilityTitle}>
              <Text style={[styles.rowTitle, styles.flex]}>{item.name}</Text>
              <Text style={styles.floor}>{item.location}</Text>
            </View>
            <Text style={styles.hours}>{item.hours}</Text>
            <Text style={styles.copy}>{item.note}</Text>
          </View>
        </View>
      ))}
      <Text accessibilityRole="header" style={styles.heading}>
        Rules
      </Text>
      {buildingInfo.rules.map((item) => (
        <InfoRow key={item.title} {...item} />
      ))}
      <Text accessibilityRole="header" style={styles.heading}>
        Building contacts
      </Text>
      <Text style={styles.copy}>
        These teams work for the building and are separate from Lamun.
      </Text>
      {buildingInfo.contacts.map((item) => (
        <View key={item.name} style={styles.contact}>
          <Text style={styles.rowTitle}>{item.name}</Text>
          <Text style={styles.hours}>
            {item.location} · {item.hours}
          </Text>
          <Text style={styles.copy}>{item.description}</Text>
          <Text style={styles.missing}>Phone number not added yet</Text>
        </View>
      ))}
      <Text accessibilityRole="header" style={styles.heading}>
        Everyday essentials
      </Text>
      {buildingInfo.essentials.map((item) => (
        <InfoRow key={item.title} {...item} />
      ))}
    </PaymentPage>
  );
}
const styles = StyleSheet.create({
  title: { fontSize: 25, fontWeight: "600", color: colors.text, marginTop: 8 },
  address: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.secondary,
    marginTop: 10,
  },
  map: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    minHeight: 48,
    marginTop: 8,
  },
  mapText: { color: colors.purple, fontSize: 14, fontWeight: "600" },
  sample: {
    color: colors.secondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
  },
  heading: {
    fontSize: 21,
    fontWeight: "600",
    color: colors.text,
    marginTop: 30,
    marginBottom: 10,
  },
  facility: {
    flexDirection: "row",
    gap: 14,
    paddingVertical: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.iconBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  flex: { flex: 1 },
  facilityTitle: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
    flexWrap: "wrap",
  },
  rowTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: colors.text,
  },
  floor: { fontSize: 13, color: colors.secondary },
  hours: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.text,
    marginTop: 4,
    marginBottom: 4,
  },
  copy: { fontSize: 14, lineHeight: 22, color: colors.secondary },
  infoRow: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  disclosure: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    minHeight: 60,
    paddingVertical: 16,
  },
  expandedText: {
    fontSize: 14,
    lineHeight: 23,
    color: colors.secondary,
    paddingBottom: 18,
  },
  contact: {
    paddingVertical: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  missing: {
    color: colors.secondary,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
  },
  pressed: { opacity: 0.6 },
});
