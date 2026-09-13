import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/theme";
import { homeMenu, sections } from "@/data/sections";

export function HomeMenu() {
  return (
    <View style={styles.menu}>
      {homeMenu.map((key, index) => {
        const item = sections[key];
        return (
          <Pressable
            key={key}
            accessibilityRole="button"
            accessibilityLabel={item.title}
            accessibilityHint={item.subtitle}
            onPress={() =>
              router.push({ pathname: "/[section]", params: { section: key } })
            }
            style={({ pressed }) => [
              styles.row,
              index > 0 && styles.divider,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.icon}>
              <Ionicons name={item.icon} size={24} color="#383B4A" />
            </View>
            <View style={styles.copy}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.secondary}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#F1F0F5",
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    minHeight: 76,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  divider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  pressed: { backgroundColor: colors.iconBackground },
  icon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.iconBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  copy: { flex: 1, gap: 4 },
  title: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "600",
    letterSpacing: -0.3,
  },
  subtitle: { color: colors.secondary, fontSize: 12.5, lineHeight: 18 },
});
