import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useRef, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { PaymentPage } from "@/components/payments-screen";
import { maintenanceStyles as shared } from "@/components/maintenance-screen";
import { colors } from "@/constants/theme";
import { categories, useMaintenance } from "@/state/maintenance";
export default function ReportIssue() {
  const { report } = useMaintenance();
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState("");
  const [access, setAccess] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [error, setError] = useState("");
  const submitting = useRef(false);
  const pickPhotos = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: true,
        selectionLimit: 5 - photos.length,
        quality: 0.8,
      });
      if (!result.canceled)
        setPhotos((current) =>
          [...current, ...result.assets.map((asset) => asset.uri)].slice(0, 5),
        );
    } catch {
      setError(
        "Couldn’t open photos. Please check photo access and try again.",
      );
    }
  };
  const submit = () => {
    if (submitting.current) return;
    if (!category || !title.trim() || !description.trim()) {
      setError("Please choose a category and add a title and description.");
      return;
    }
    submitting.current = true;
    const id = report({
      category,
      title: title.trim(),
      description: description.trim(),
      availability: availability.trim(),
      access: access.trim(),
      photos,
    });
    router.replace({ pathname: "/issue/[id]", params: { id } });
  };
  return (
    <PaymentPage
      title="Report an issue"
      onBack={() =>
        router.dismissTo({
          pathname: "/[section]",
          params: { section: "maintenance" },
        })
      }
    >
      <Text style={shared.copy}>
        Tell us what’s wrong so we can help arrange a repair.
      </Text>
      <Text style={styles.label}>Category</Text>
      <View style={styles.categories}>
        {categories.map((item) => (
          <Pressable
            key={item}
            accessibilityRole="radio"
            accessibilityState={{ checked: category === item }}
            onPress={() => setCategory(item)}
            style={[
              styles.category,
              category === item && {
                backgroundColor: colors.lavender,
                borderColor: colors.purple,
              },
            ]}
          >
            <Text
              style={{ color: category === item ? colors.purple : colors.text }}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.label}>Title</Text>
      <TextInput
        placeholderTextColor={colors.secondary}
        accessibilityLabel="Issue title"
        value={title}
        onChangeText={setTitle}
        placeholder="e.g. Air conditioning not cooling"
        maxLength={100}
        style={styles.input}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        placeholderTextColor={colors.secondary}
        accessibilityLabel="Description"
        value={description}
        onChangeText={setDescription}
        placeholder="What happened, and when did it start?"
        multiline
        maxLength={4000}
        style={[styles.input, styles.multiline]}
      />
      <Text style={styles.label}>Photos (optional)</Text>
      <View style={styles.photos}>
        {photos.map((uri, index) => (
          <View key={uri + index}>
            <Image source={{ uri }} style={styles.photo} />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Remove photo ${index + 1}`}
              onPress={() =>
                setPhotos((current) => current.filter((_, i) => i !== index))
              }
              style={styles.remove}
            >
              <Text style={{ color: colors.purple }}>Remove</Text>
            </Pressable>
          </View>
        ))}
      </View>
      {photos.length < 5 && (
        <Pressable
          accessibilityRole="button"
          onPress={pickPhotos}
          style={styles.add}
        >
          <Text style={{ color: colors.purple, fontWeight: "600" }}>
            Add photos · {photos.length}/5
          </Text>
        </Pressable>
      )}
      <Text style={styles.label}>Preferred visit times (optional)</Text>
      <TextInput
        placeholderTextColor={colors.secondary}
        accessibilityLabel="Preferred visit times"
        value={availability}
        onChangeText={setAvailability}
        placeholder="e.g. Weekdays after 14:00"
        maxLength={500}
        style={styles.input}
      />
      <Text style={styles.label}>Access notes (optional)</Text>
      <TextInput
        placeholderTextColor={colors.secondary}
        accessibilityLabel="Access notes"
        value={access}
        onChangeText={setAccess}
        placeholder="Anything we should know before visiting?"
        multiline
        maxLength={1000}
        style={[styles.input, styles.multiline]}
      />
      <Text style={[shared.copy, { marginVertical: 16 }]}>
        Lamun will coordinate with you before confirming an appointment.
      </Text>
      {!!error && (
        <Text
          accessibilityRole="alert"
          style={{ color: "#B53B51", marginBottom: 12 }}
        >
          {error}
        </Text>
      )}
      <Pressable
        accessibilityRole="button"
        onPress={submit}
        style={shared.button}
      >
        <Text style={shared.buttonText}>Submit report</Text>
      </Pressable>
    </PaymentPage>
  );
}
const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginTop: 24,
    marginBottom: 10,
  },
  categories: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  category: {
    paddingHorizontal: 13,
    minHeight: 44,
    justifyContent: "center",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    fontSize: 16,
    lineHeight: 23,
    color: colors.text,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#DCDCE7",
    borderRadius: 12,
    padding: 15,
    minHeight: 54,
  },
  multiline: { minHeight: 110, textAlignVertical: "top" },
  photos: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  photo: { width: 100, height: 100, borderRadius: 12 },
  remove: { minHeight: 44, justifyContent: "center", alignItems: "center" },
  add: {
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.lavenderBadge,
    borderRadius: 12,
  },
});
