import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

import { logoXml } from "@/constants/logo";
import { colors } from "@/constants/theme";
import { demoTenancy } from "@/data/demo";

export function AppHeader() {
  return (
    <View style={styles.header}>
      <View accessible accessibilityRole="image" accessibilityLabel="Lamun">
        <SvgXml xml={logoXml} width={142} height={44} />
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open profile"
        onPress={() =>
          router.push({
            pathname: "/[section]",
            params: { section: "profile" },
          })
        }
        style={({ pressed }) => [styles.avatar, pressed && styles.pressed]}
      >
        <Text style={styles.initials}>{demoTenancy.tenantInitials}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 20,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.stone,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E0D7",
  },
  initials: { fontSize: 14, fontWeight: "600", color: "#625D53" },
  pressed: { opacity: 0.65, transform: [{ scale: 0.96 }] },
});
