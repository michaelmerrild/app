import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
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
import { colors } from "@/constants/theme";
import {
  contactReasons,
  validateContact,
  type ContactReason,
} from "@/data/contact";
import { useMessages } from "@/state/messages";

export default function ContactScreen() {
  const params = useLocalSearchParams<{ reason?: string; from?: string }>();
  const [reason, setReason] = useState<ContactReason | "">(
    () => contactReasons.find((item) => item === params.reason) ?? "",
  );
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selecting, setSelecting] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const submitted = useRef(false);
  const subjectInput = useRef<TextInput>(null);
  const messageInput = useRef<TextInput>(null);
  const { contact } = useMessages();
  const errors = validateContact(reason, subject, message);
  const back = () =>
    params.from === "tenancy"
      ? router.dismissTo({
          pathname: "/[section]",
          params: { section: "tenancy" },
        })
      : router.dismissTo("/messages");
  const submit = () => {
    if (submitted.current) return;
    setAttempted(true);
    if (errors.reason || errors.subject || errors.message) {
      if (errors.subject) subjectInput.current?.focus();
      else if (errors.message) messageInput.current?.focus();
      return;
    }
    submitted.current = true;
    setSubmitting(true);
    const id = contact(reason, subject, message);
    router.replace({ pathname: "/chat/[id]", params: { id } });
  };
  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <Pressable
            onPress={back}
            accessibilityRole="button"
            accessibilityLabel="Back"
            style={styles.back}
          >
            <Ionicons name="chevron-back" size={26} color={colors.purple} />
          </Pressable>
          <Text style={styles.headerTitle}>Contact Lamun</Text>
        </View>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.form}
        >
          <Text style={styles.title} accessibilityRole="header">
            How can we help?
          </Text>
          <Text style={styles.intro}>
            Choose a reason and tell us what’s on your mind.
          </Text>
          <Text style={styles.label}>Reason</Text>
          <Pressable
            onPress={() => setSelecting(true)}
            accessibilityRole="button"
            accessibilityLabel={
              reason ? `Reason: ${reason}` : "Choose a reason"
            }
            accessibilityState={{ expanded: selecting }}
            style={styles.select}
          >
            <Text style={[styles.selectText, !reason && styles.muted]}>
              {reason || "Choose a reason"}
            </Text>
            <Ionicons name="chevron-down" size={20} color={colors.secondary} />
          </Pressable>
          {reason !== "" && (
            <>
              {reason === "Maintenance follow-up" && (
                <Text style={styles.hint}>
                  Already reported an issue? Ask us a question or coordinate a
                  visit here. To report a new issue, go to Maintenance.
                </Text>
              )}
              <Text style={styles.label}>Subject</Text>
              <TextInput
                ref={subjectInput}
                accessibilityLabel="Subject"
                value={subject}
                onChangeText={setSubject}
                placeholder="A short summary"
                placeholderTextColor={colors.secondary}
                maxLength={100}
                returnKeyType="next"
                onSubmitEditing={() => messageInput.current?.focus()}
                style={[
                  styles.input,
                  attempted && errors.subject ? styles.invalid : undefined,
                ]}
              />
              {attempted && !!errors.subject && (
                <Text accessibilityRole="alert" style={styles.error}>
                  {errors.subject}
                </Text>
              )}
              <Text style={styles.label}>Message</Text>
              <TextInput
                ref={messageInput}
                accessibilityLabel="Message"
                value={message}
                onChangeText={setMessage}
                placeholder="Tell us a little more…"
                placeholderTextColor={colors.secondary}
                multiline
                maxLength={4000}
                textAlignVertical="top"
                style={[
                  styles.input,
                  styles.message,
                  attempted && errors.message ? styles.invalid : undefined,
                ]}
              />
              {attempted && !!errors.message && (
                <Text accessibilityRole="alert" style={styles.error}>
                  {errors.message}
                </Text>
              )}
              <Text style={styles.hint}>
                You can continue the conversation in Messages.
              </Text>
              <Pressable
                disabled={submitting}
                onPress={submit}
                accessibilityRole="button"
                accessibilityLabel="Send Message"
                style={({ pressed }) => [
                  styles.submit,
                  pressed && { opacity: 0.7 },
                ]}
              >
                <Text style={styles.submitText}>
                  {submitting ? "Sending…" : "Send Message"}
                </Text>
                <Ionicons name="arrow-forward" size={19} color="white" />
              </Pressable>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      <Modal
        visible={selecting}
        transparent
        animationType="fade"
        onRequestClose={() => setSelecting(false)}
      >
        <View style={styles.overlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setSelecting(false)}
            accessibilityRole="button"
            accessibilityLabel="Dismiss reason selector"
          />
          <View style={styles.sheet} accessibilityViewIsModal>
            <View style={styles.selectorHeader}>
              <Text style={styles.selectorTitle}>What can we help with?</Text>
              <Pressable
                onPress={() => setSelecting(false)}
                style={styles.back}
                accessibilityRole="button"
                accessibilityLabel="Close reason selector"
              >
                <Ionicons name="close" size={23} color={colors.text} />
              </Pressable>
            </View>
            <ScrollView>
              {contactReasons.map((item) => (
                <Pressable
                  key={item}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: reason === item }}
                  onPress={() => {
                    setReason(item);
                    setSelecting(false);
                  }}
                  style={({ pressed }) => [
                    styles.option,
                    pressed && { backgroundColor: colors.iconBackground },
                  ]}
                >
                  <Text style={styles.optionText}>{item}</Text>
                  {reason === item && (
                    <Ionicons
                      name="checkmark"
                      size={21}
                      color={colors.purple}
                    />
                  )}
                </Pressable>
              ))}
            </ScrollView>
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
    padding: 10,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  back: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 19, fontWeight: "600", color: colors.text },
  form: { padding: 24, paddingBottom: 40 },
  title: {
    fontSize: 27,
    lineHeight: 35,
    fontWeight: "700",
    letterSpacing: -0.6,
    color: colors.text,
    marginTop: 8,
  },
  intro: {
    color: colors.secondary,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 10,
    marginBottom: 10,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 10,
  },
  select: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    minHeight: 54,
    borderWidth: 1,
    borderColor: "#DCDCE7",
    borderRadius: 12,
    backgroundColor: colors.surface,
    padding: 15,
  },
  selectText: { fontSize: 16, color: colors.text, flexShrink: 1 },
  muted: { color: colors.secondary },
  input: {
    fontSize: 16,
    lineHeight: 23,
    minHeight: 54,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#DCDCE7",
    borderRadius: 12,
    padding: 15,
    color: colors.text,
  },
  message: { minHeight: 160 },
  hint: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.secondary,
    marginTop: 12,
  },
  invalid: { borderColor: "#B53B51" },
  error: { color: "#B53B51", fontSize: 13, marginTop: 7 },
  submit: {
    backgroundColor: colors.purple,
    borderRadius: 13,
    minHeight: 50,
    marginTop: 26,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  submitText: { color: "white", fontSize: 16, fontWeight: "600" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(23,23,26,0.3)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  sheet: {
    width: "100%",
    maxWidth: 420,
    maxHeight: "85%",
    borderRadius: 22,
    backgroundColor: colors.surface,
    padding: 16,
  },
  selectorHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  selectorTitle: {
    fontSize: 18,
    color: colors.text,
    fontWeight: "700",
    flex: 1,
  },
  option: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  optionText: { color: colors.text, fontSize: 15 },
});
