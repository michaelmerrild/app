import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/theme";
import type { IconName } from "@/data/sections";

type Props = { title: string; description: string; icon: IconName };

export function Placeholder({ title, description, icon }: Props) {
  return (
    <View style={styles.content}>
      <View style={styles.icon}>
        <Ionicons name={icon} size={34} color={colors.purple} />
      </View>
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.soon}>Coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    paddingBottom: 88,
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 28,
    backgroundColor: colors.lavender,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    lineHeight: 34,
    fontWeight: "700",
    letterSpacing: -0.7,
    textAlign: "center",
  },
  description: {
    maxWidth: 300,
    color: colors.secondary,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 12,
  },
  soon: {
    color: colors.purple,
    fontSize: 13,
    fontWeight: "500",
    backgroundColor: colors.lavender,
    borderRadius: 16,
    overflow: "hidden",
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginTop: 24,
  },
});
