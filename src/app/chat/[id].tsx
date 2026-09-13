import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Placeholder } from "@/components/placeholder";
import { colors } from "@/constants/theme";
import { useMessages } from "@/state/messages";

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { entries, messagesByThread, markRead, send } = useMessages();
  const messages = messagesByThread[id] ?? [];
  const thread = entries.find(
    (entry) => entry.kind === "chat" && entry.id === id,
  );
  const [draft, setDraft] = useState("");
  const [notice, setNotice] = useState<"attachments" | "details" | null>(null);
  const [unreadAtOpen] = useState(thread?.unread ?? 0);
  const scroll = useRef<ScrollView>(null);
  const shouldScroll = useRef(false);
  const hasThread = !!thread;
  useEffect(() => {
    if (hasThread) markRead(id);
  }, [id, markRead, hasThread]);
  const back = () => router.dismissTo("/messages");
  const submit = () => {
    if (!draft.trim()) return;
    shouldScroll.current = true;
    send(id, draft);
    setDraft("");
  };
  return (
    <SafeAreaView
      style={styles.screen}
      edges={["top", "bottom", "left", "right"]}
    >
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <Pressable
            onPress={back}
            accessibilityRole="button"
            accessibilityLabel="Back to messages"
            style={styles.iconButton}
          >
            <Ionicons name="chevron-back" size={28} color={colors.purple} />
          </Pressable>
          <View style={styles.heading}>
            <Text style={styles.title} accessibilityRole="header">
              {thread?.title ?? "Chat not found"}
            </Text>
            <Text style={styles.subtitle}>With Lamun</Text>
          </View>
          {thread && (
            <Pressable
              onPress={() => setNotice("details")}
              accessibilityRole="button"
              accessibilityLabel="Chat options"
              style={styles.iconButton}
            >
              <Ionicons
                name="ellipsis-horizontal"
                size={25}
                color={colors.purple}
              />
            </Pressable>
          )}
        </View>
        {!messagesByThread[id] || !thread ? (
          <Placeholder
            title={thread?.title ?? "Chat not found"}
            icon="chatbubble-outline"
            description={
              thread
                ? "This conversation is a placeholder. Open Technician visit to try the sample chat."
                : "This conversation is not available."
            }
          />
        ) : (
          <>
            <ScrollView
              ref={scroll}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.conversation}
              onContentSizeChange={() => {
                if (shouldScroll.current) {
                  scroll.current?.scrollToEnd({ animated: true });
                  shouldScroll.current = false;
                }
              }}
            >
              {thread.maintenanceId && (
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/issue/[id]",
                      params: { id: thread.maintenanceId! },
                    })
                  }
                  accessibilityRole="button"
                  accessibilityLabel="Open linked maintenance report"
                  style={({ pressed }) => [
                    styles.linked,
                    pressed && styles.pressed,
                  ]}
                >
                  <View style={styles.linkIcon}>
                    <Ionicons
                      name="construct-outline"
                      size={22}
                      color={colors.text}
                    />
                  </View>
                  <View style={{ flex: 1, gap: 5 }}>
                    <Text style={styles.linkLabel}>
                      Linked maintenance report
                    </Text>
                    <Text style={styles.linkTitle}>{thread.maintenanceId}</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={21}
                    color={colors.secondary}
                  />
                </Pressable>
              )}
              <View style={styles.date}>
                <Text style={styles.dateText}>
                  {id === "technician" ? "11 Sep 2026" : "Today"}
                </Text>
              </View>
              {messages.map((message, index) => (
                <View key={message.id}>
                  {message.id === "3" && unreadAtOpen > 0 && (
                    <View style={styles.unreadDivider}>
                      <View style={styles.line} />
                      <Text style={styles.unreadText}>
                        {unreadAtOpen} unread messages
                      </Text>
                      <View style={styles.line} />
                    </View>
                  )}
                  {!message.outgoing &&
                    (index === 0 || messages[index - 1].outgoing) && (
                      <Text style={styles.sender}>Nina · Lamun</Text>
                    )}
                  <View
                    style={[
                      styles.bubble,
                      message.outgoing ? styles.outgoing : styles.incoming,
                    ]}
                  >
                    <Text
                      style={[styles.message, message.outgoing && styles.white]}
                    >
                      {message.text}
                    </Text>
                    <View style={styles.timestamp}>
                      <Text
                        style={[styles.time, message.outgoing && styles.white]}
                      >
                        {message.time}
                      </Text>
                      {message.outgoing && message.id === "2" && (
                        <Ionicons
                          name="checkmark-done"
                          size={14}
                          color="white"
                        />
                      )}
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
            <View style={styles.composer}>
              <Pressable
                onPress={() => setNotice("attachments")}
                accessibilityRole="button"
                accessibilityLabel="Add attachment"
                style={styles.attachment}
              >
                <Ionicons name="add" size={27} color="#424659" />
              </Pressable>
              <TextInput
                accessibilityLabel="Message Lamun"
                placeholder="Message Lamun…"
                placeholderTextColor={colors.secondary}
                multiline
                value={draft}
                onChangeText={setDraft}
                style={styles.input}
                maxLength={4000}
                onFocus={() => scroll.current?.scrollToEnd({ animated: true })}
              />
              <Pressable
                disabled={!draft.trim()}
                accessibilityRole="button"
                accessibilityLabel="Send message"
                accessibilityState={{ disabled: !draft.trim() }}
                onPress={submit}
                style={({ pressed }) => [
                  styles.send,
                  !draft.trim() && styles.disabled,
                  pressed && styles.pressed,
                ]}
              >
                <Ionicons name="send" size={21} color="white" />
              </Pressable>
            </View>
          </>
        )}
      </KeyboardAvoidingView>
      <Modal
        visible={notice !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setNotice(null)}
      >
        <View style={styles.overlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setNotice(null)}
            accessibilityRole="button"
            accessibilityLabel="Dismiss chat dialog"
          />
          <View style={styles.dialog} accessibilityViewIsModal>
            <Text style={styles.dialogTitle}>
              {notice === "attachments" ? "Attachments" : "About this chat"}
            </Text>
            <Text style={styles.dialogCopy}>
              {notice === "attachments"
                ? "Sharing photos and files will be available here soon."
                : "Conversations are organized by subject. Lamun can mark a chat resolved once everything is sorted."}
            </Text>
            <Pressable
              onPress={() => setNotice(null)}
              accessibilityRole="button"
              style={styles.close}
            >
              <Text style={styles.white}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
    gap: 6,
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: { flex: 1, gap: 3 },
  title: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "700",
    color: colors.text,
    letterSpacing: -0.4,
  },
  subtitle: { fontSize: 14, color: colors.secondary },
  conversation: { padding: 16, paddingBottom: 28 },
  linked: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#F2F0F7",
    borderRadius: 14,
    padding: 12,
    marginBottom: 20,
  },
  linkIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.lavender,
    justifyContent: "center",
    alignItems: "center",
  },
  linkLabel: { fontSize: 12, color: colors.secondary },
  linkTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    color: colors.text,
  },
  date: {
    alignSelf: "center",
    backgroundColor: "#F0F0F5",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
    marginBottom: 24,
  },
  dateText: { fontSize: 12, color: colors.secondary },
  sender: {
    color: colors.purple,
    fontSize: 12,
    marginLeft: 8,
    marginBottom: 8,
  },
  bubble: {
    maxWidth: "84%",
    borderRadius: 17,
    paddingHorizontal: 13,
    paddingTop: 12,
    paddingBottom: 8,
    marginBottom: 9,
  },
  incoming: {
    alignSelf: "flex-start",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#E4E4EE",
  },
  outgoing: {
    alignSelf: "flex-end",
    backgroundColor: colors.purple,
    marginTop: 3,
  },
  message: { fontSize: 16, lineHeight: 23, color: colors.text },
  white: { color: "white" },
  timestamp: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 5,
    alignItems: "center",
    marginTop: 7,
  },
  time: { fontSize: 10, color: colors.secondary },
  unreadDivider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 20,
  },
  line: { flex: 1, height: 1, backgroundColor: "#DFDEEB" },
  unreadText: { color: colors.secondary, fontSize: 12 },
  composer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  attachment: {
    height: 42,
    width: 42,
    borderRadius: 21,
    backgroundColor: colors.iconBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: "#DFDFEA",
    borderRadius: 23,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 15,
    lineHeight: 20,
    color: colors.text,
  },
  send: {
    height: 44,
    width: 44,
    borderRadius: 22,
    backgroundColor: colors.purple,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: { opacity: 0.45 },
  pressed: { opacity: 0.65 },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "rgba(23,23,26,0.3)",
  },
  dialog: {
    backgroundColor: colors.surface,
    width: "100%",
    maxWidth: 380,
    padding: 24,
    borderRadius: 22,
  },
  dialogTitle: { fontSize: 21, fontWeight: "700", color: colors.text },
  dialogCopy: {
    marginTop: 14,
    fontSize: 15,
    lineHeight: 23,
    color: colors.secondary,
  },
  close: {
    marginTop: 24,
    padding: 14,
    alignItems: "center",
    backgroundColor: colors.purple,
    borderRadius: 12,
  },
});
