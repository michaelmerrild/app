import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Placeholder } from "@/components/placeholder";
import { colors } from "@/constants/theme";

export default function NotFoundScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Placeholder
        title="Page not found"
        icon="compass-outline"
        description="This page isn’t available."
      />
      <Link
        href="/"
        replace
        style={{ textAlign: "center", padding: 24, marginBottom: 32 }}
      >
        <Text style={{ color: colors.purple }}>Back to My home</Text>
      </Link>
    </SafeAreaView>
  );
}
