import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PayRentScreen } from "@/components/pay-rent-screen";
import { PaymentsScreen } from "@/components/payments-screen";
import { TenancyScreen } from "@/components/tenancy-screen";
import { BuildingScreen } from "@/components/building-screen";
import { MaintenanceScreen } from "@/components/maintenance-screen";
import { Placeholder } from "@/components/placeholder";
import { colors } from "@/constants/theme";
import { sections } from "@/data/sections";
import NotFoundScreen from "./+not-found";

export default function SectionScreen() {
  const { section } = useLocalSearchParams<{ section: string }>();
  if (section === "pay-rent") return <PayRentScreen />;
  if (section === "payment") return <PaymentsScreen />;
  if (section === "tenancy") return <TenancyScreen />;
  if (section === "building") return <BuildingScreen />;
  if (section === "maintenance") return <MaintenanceScreen />;
  if (!Object.hasOwn(sections, section)) return <NotFoundScreen />;
  const item = sections[section as keyof typeof sections];

  return (
    <SafeAreaView style={styles.screen}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Back"
        onPress={() =>
          router.canGoBack() ? router.back() : router.replace("/")
        }
        style={({ pressed }) => [styles.back, pressed && { opacity: 0.55 }]}
      >
        <Ionicons name="chevron-back" color={colors.purple} size={24} />
        <Text style={styles.backText}>Back</Text>
      </Pressable>
      <Placeholder
        title={item.title}
        description={item.description}
        icon={item.icon}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  back: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
    padding: 16,
    minHeight: 52,
  },
  backText: { color: colors.purple, fontSize: 16 },
});
