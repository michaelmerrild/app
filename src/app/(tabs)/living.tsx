import { router } from "expo-router";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "@/components/app-header";
import { LivingRow, livingStyles } from "@/components/living-ui";
import { livingCategories } from "@/data/living";
export default function LivingScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <AppHeader />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 22, paddingBottom: 32 }}
      >
        <Text accessibilityRole="header" style={livingStyles.heading}>
          Living
        </Text>
        <Text style={livingStyles.copy}>A little more for your everyday.</Text>
        {livingCategories.map((item) => (
          <LivingRow
            key={item.id}
            title={item.name}
            description={item.description}
            kind={item.id}
            onPress={() =>
              item.id === "internet"
                ? router.push({
                    pathname: "/service/[id]",
                    params: { id: "internet" },
                  })
                : router.push({
                    pathname: "/living-category/[id]",
                    params: { id: item.id },
                  })
            }
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
