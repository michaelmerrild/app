import Ionicons from "@expo/vector-icons/Ionicons";
import { Modal, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { colors } from "@/constants/theme";
import { defaultFilters, type InboxFilters } from "@/data/inbox";

export function MessageFilters({
  visible,
  value,
  onChange,
  onClose,
}: {
  visible: boolean;
  value: InboxFilters;
  onChange: (value: InboxFilters) => void;
  onClose: () => void;
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Dismiss filters"
        />
        <View style={styles.sheet} accessibilityViewIsModal>
          <View style={styles.header}>
            <Text style={styles.title} accessibilityRole="header">
              Filter messages
            </Text>
            <Pressable
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Close filters"
              style={styles.close}
            >
              <Ionicons name="close" size={24} color={colors.text} />
            </Pressable>
          </View>
          <Text style={styles.caption}>SHOW</Text>
          {(
            [
              { key: "all", label: "Chats and updates" },
              { key: "chat", label: "Chats" },
              { key: "update", label: "Updates" },
            ] as const
          ).map((option) => (
            <Pressable
              key={option.key}
              accessibilityRole="radio"
              accessibilityState={{ checked: value.type === option.key }}
              onPress={() => onChange({ ...value, type: option.key })}
              style={styles.option}
            >
              <Text style={styles.label}>{option.label}</Text>
              <Ionicons
                name={
                  value.type === option.key
                    ? "radio-button-on"
                    : "radio-button-off"
                }
                size={22}
                color={
                  value.type === option.key ? colors.purple : colors.secondary
                }
              />
            </Pressable>
          ))}
          <View style={styles.rule} />
          <View style={styles.option}>
            <Text style={styles.label}>Unread only</Text>
            <Switch
              accessibilityLabel="Unread only"
              value={value.unreadOnly}
              onValueChange={(unreadOnly) => onChange({ ...value, unreadOnly })}
              trackColor={{ true: colors.purple }}
            />
          </View>
          <View style={styles.option}>
            <Text style={styles.label}>Include resolved chats</Text>
            <Switch
              accessibilityLabel="Include resolved chats"
              value={value.includeResolved}
              onValueChange={(includeResolved) =>
                onChange({ ...value, includeResolved })
              }
              trackColor={{ true: colors.purple }}
            />
          </View>
          <View style={styles.actions}>
            <Pressable
              style={styles.reset}
              onPress={() => onChange(defaultFilters)}
              accessibilityRole="button"
            >
              <Text style={styles.resetText}>Reset</Text>
            </Pressable>
            <Pressable
              style={styles.done}
              onPress={onClose}
              accessibilityRole="button"
            >
              <Text style={styles.doneText}>Done</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(23,23,26,0.3)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  sheet: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  title: { fontSize: 21, fontWeight: "700", color: colors.text },
  close: { padding: 10, marginRight: -10 },
  caption: {
    color: colors.secondary,
    fontSize: 11,
    letterSpacing: 1,
    marginBottom: 8,
  },
  option: {
    minHeight: 49,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  label: { fontSize: 15, color: colors.text, flexShrink: 1 },
  rule: { height: 1, backgroundColor: colors.border, marginVertical: 12 },
  actions: { flexDirection: "row", gap: 12, marginTop: 22 },
  reset: { padding: 14, flex: 1, alignItems: "center" },
  resetText: { color: colors.secondary, fontSize: 16 },
  done: {
    padding: 14,
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.purple,
    borderRadius: 12,
  },
  doneText: { color: "white", fontSize: 16, fontWeight: "600" },
});
