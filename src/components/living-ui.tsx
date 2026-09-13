import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  LivingThumbnail,
  type ThumbnailKind,
} from "@/components/living-thumbnail";
import { colors } from "@/constants/theme";
export function LivingRow({
  title,
  description,
  kind,
  onPress,
}: {
  title: string;
  description: string;
  kind: ThumbnailKind;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && { opacity: 0.65 }]}
    >
      <View style={styles.thumbnail}>
        <LivingThumbnail kind={kind} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={livingStyles.title}>{title}</Text>
        <Text style={[livingStyles.copy, { marginTop: 4 }]}>{description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.secondary} />
    </Pressable>
  );
}
export const livingStyles = StyleSheet.create({
  title: {
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 25,
    color: colors.text,
  },
  heading: {
    fontSize: 26,
    lineHeight: 34,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 10,
  },
  copy: { fontSize: 14, lineHeight: 22, color: colors.secondary },
  note: {
    fontSize: 12,
    lineHeight: 19,
    color: colors.secondary,
    marginTop: 20,
  },
  button: {
    minHeight: 50,
    backgroundColor: colors.purple,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  buttonText: { color: "white", fontSize: 15, fontWeight: "600" },
});
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  thumbnail: { width: 80, height: 80, borderRadius: 14, overflow: "hidden" },
});
