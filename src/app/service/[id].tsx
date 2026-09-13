import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { PaymentPage } from "@/components/payments-screen";
import { LivingThumbnail } from "@/components/living-thumbnail";
import { livingStyles as shared } from "@/components/living-ui";
import { services } from "@/data/living";
import { formatBaht } from "@/data/payments";
import { colors } from "@/constants/theme";
import NotFoundScreen from "../+not-found";
export default function ServiceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const service = services.find((item) => item.id === id);
  if (!service) return <NotFoundScreen />;
  const kind =
    id === "internet" ? "internet" : id === "fitness" ? "offers" : "home";
  return (
    <PaymentPage
      title={service.name}
      onBack={() =>
        router.canGoBack() ? router.back() : router.replace("/living")
      }
    >
      <View style={styles.hero}>
        <LivingThumbnail
          kind={
            id === "fitness"
              ? "fitness"
              : id === "housekeeping"
                ? "housekeeping"
                : id === "laundry"
                  ? "laundry"
                  : id === "aircon"
                    ? "aircon"
                    : kind
          }
        />
      </View>
      <Text style={shared.copy}>{service.description}</Text>
      <View style={styles.basis}>
        <Text style={styles.basisText}>{service.basis}</Text>
      </View>
      <Text accessibilityRole="header" style={styles.packages}>
        {id === "internet" ? "Choose your plan" : "Packages"}
      </Text>
      {service.packages.map((pkg) => (
        <View key={pkg.id} style={styles.package}>
          <Text style={shared.title}>{pkg.name}</Text>
          <Text style={[shared.copy, { marginTop: 6 }]}>{pkg.description}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatBaht(pkg.price)}</Text>
            <Text style={shared.copy}>{pkg.unit}</Text>
          </View>
          {!!pkg.saving && (
            <View style={styles.savings}>
              <Text style={styles.original}>
                {formatBaht(pkg.price + pkg.saving)}
              </Text>
              <Text style={styles.basisText}>
                Save {formatBaht(pkg.saving)}
              </Text>
            </View>
          )}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Choose ${pkg.name}`}
            onPress={() =>
              router.push({
                pathname: "/living-order",
                params: { service: id, package: pkg.id },
              })
            }
            style={({ pressed }) => [
              shared.button,
              pressed && { opacity: 0.65 },
            ]}
          >
            <Text style={shared.buttonText}>
              {id === "internet" ? "Choose plan" : "Choose package"}
            </Text>
          </Pressable>
        </View>
      ))}
    </PaymentPage>
  );
}
const styles = StyleSheet.create({
  hero: { height: 160, borderRadius: 18, overflow: "hidden", marginBottom: 22 },
  basis: {
    marginTop: 18,
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.lavender,
  },
  basisText: {
    color: colors.purple,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "500",
  },
  packages: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.text,
    marginTop: 28,
  },
  package: {
    paddingVertical: 22,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
  },
  price: { fontSize: 27, fontWeight: "600", color: colors.text },
  savings: { flexDirection: "row", gap: 12, marginTop: 6 },
  original: {
    fontSize: 14,
    lineHeight: 22,
    textDecorationLine: "line-through",
    color: colors.secondary,
  },
});
