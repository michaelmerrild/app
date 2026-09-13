import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "@/components/app-header";
import { MessageFilters } from "@/components/message-filters";
import { colors } from "@/constants/theme";
import { defaultFilters, filterInbox, type InboxEntry } from "@/data/inbox";
import { useMessages } from "@/state/messages";

export default function MessagesScreen() {
  const { entries, markRead } = useMessages();
  const [filters, setFilters] = useState(defaultFilters);
  const [showFilters, setShowFilters] = useState(false);
  const filtered =
    filters.type !== "all" || filters.unreadOnly || filters.includeResolved;
  const open = (entry: InboxEntry) => {
    if (entry.kind === "chat")
      router.push({ pathname: "/chat/[id]", params: { id: entry.id } });
    else {
      markRead(entry.id);
      router.push({
        pathname: "/[section]",
        params: { section: entry.destination! },
      });
    }
  };
  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <AppHeader />
      <View style={styles.heading}>
        <Text style={styles.title} accessibilityRole="header">
          Messages
        </Text>
        <Pressable
          onPress={() => setShowFilters(true)}
          accessibilityLabel="Filter messages"
          accessibilityRole="button"
          style={styles.action}
        >
          <Ionicons name="options-outline" size={27} color={colors.purple} />
          {filtered && <View style={styles.filterDot} />}
        </Pressable>
      </View>
      <Pressable
        onPress={() => router.push("/contact")}
        accessibilityRole="button"
        accessibilityLabel="Contact Lamun"
        style={({ pressed }) => [styles.contact, pressed && styles.pressed]}
      >
        <Ionicons name="chatbubble-ellipses-outline" size={20} color="white" />
        <Text style={styles.contactText}>Contact Lamun</Text>
      </Pressable>
      <FlatList
        data={filterInbox(entries, filters)}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons
              name="mail-open-outline"
              size={34}
              color={colors.secondary}
            />
            <Text style={styles.emptyTitle}>All clear</Text>
            <Text style={styles.emptyCopy}>
              No messages match these filters.
            </Text>
            <Pressable
              onPress={() => setFilters(defaultFilters)}
              style={styles.action}
              accessibilityRole="button"
            >
              <Text style={{ color: colors.purple }}>Reset filters</Text>
            </Pressable>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => open(item)}
            accessibilityRole="button"
            accessibilityLabel={`${item.title}${item.unread ? `, ${item.unread} unread ${item.kind === "chat" ? "messages" : "update"}` : ""}`}
            style={({ pressed }) => [
              styles.row,
              item.kind === "update" && styles.update,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.icon}>
              <Ionicons
                name={
                  item.kind === "chat"
                    ? "chatbubble-outline"
                    : item.id === "receipt"
                      ? "receipt-outline"
                      : "calendar-outline"
                }
                size={25}
                color={item.kind === "update" ? colors.purple : colors.text}
              />
            </View>
            <View style={styles.copy}>
              <Text
                style={[styles.subject, item.unread > 0 && styles.unreadTitle]}
              >
                {item.title}
              </Text>
              <Text style={styles.preview} numberOfLines={2}>
                {item.preview}
              </Text>
            </View>
            <View style={styles.meta}>
              <Text style={styles.time}>{item.time}</Text>
              {item.unread > 0 &&
                (item.kind === "chat" ? (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.unread}</Text>
                  </View>
                ) : (
                  <View style={styles.dot} />
                ))}
            </View>
          </Pressable>
        )}
      />
      <MessageFilters
        visible={showFilters}
        value={filters}
        onChange={setFilters}
        onClose={() => setShowFilters(false)}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    flex: 1,
    fontSize: 29,
    lineHeight: 38,
    fontWeight: "700",
    letterSpacing: -0.8,
    color: colors.text,
  },
  action: {
    minHeight: 44,
    minWidth: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  filterDot: {
    position: "absolute",
    right: 6,
    top: 6,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.purple,
  },
  contact: {
    marginHorizontal: 22,
    marginTop: 16,
    marginBottom: 2,
    minHeight: 48,
    backgroundColor: colors.purple,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  contactText: { color: "white", fontSize: 16, fontWeight: "600" },
  list: { paddingHorizontal: 12, paddingTop: 18, paddingBottom: 24 },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E2E1EA",
  },
  row: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 20,

    alignItems: "flex-start",
  },
  update: { backgroundColor: colors.iconBackground },
  pressed: { opacity: 0.65 },
  icon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.lavender,
  },
  copy: { flex: 1, gap: 5 },
  subject: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "500",
    letterSpacing: -0.35,
    color: colors.text,
  },
  unreadTitle: { fontWeight: "700" },
  preview: { fontSize: 14, lineHeight: 21, color: colors.secondary },
  meta: { alignItems: "flex-end", gap: 12, paddingTop: 2 },
  time: { fontSize: 11, color: colors.secondary },
  badge: {
    backgroundColor: colors.purple,
    minWidth: 23,
    height: 23,
    paddingHorizontal: 6,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { color: "white", fontSize: 12, fontWeight: "600" },
  dot: { height: 9, width: 9, borderRadius: 5, backgroundColor: colors.purple },
  empty: { padding: 35, alignItems: "center", gap: 14 },
  emptyTitle: { fontSize: 20, fontWeight: "600", color: colors.text },
  emptyCopy: { color: colors.secondary, textAlign: "center" },
});
