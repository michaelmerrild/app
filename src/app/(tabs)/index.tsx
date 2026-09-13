import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppHeader } from "@/components/app-header";
import { HomeMenu } from "@/components/home-menu";
import { PropertyCard } from "@/components/property-card";
import { RentReminder } from "@/components/rent-reminder";
import { colors } from "@/constants/theme";
import { demoTenancy } from "@/data/demo";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <AppHeader />
        <View style={styles.content}>
          <PropertyCard />
          <RentReminder rent={demoTenancy.rent} />
          <HomeMenu />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scroll: { flexGrow: 1, paddingBottom: 28 },
  content: { paddingHorizontal: 18, gap: 16 },
});
