import Ionicons from "@expo/vector-icons/Ionicons";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";

import { MessagesProvider } from "@/state/messages";
import { MaintenanceProvider } from "@/state/maintenance";

import { colors } from "@/constants/theme";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = { initialRouteName: "(tabs)" };

export default function RootLayout() {
  const [loaded, error] = useFonts(Ionicons.font);
  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <View style={styles.root}>
      <View style={styles.app}>
        <StatusBar style="dark" />
        <MessagesProvider>
          <MaintenanceProvider>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: colors.background },
              }}
            >
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="[section]" />
              <Stack.Screen name="chat/[id]" />
              <Stack.Screen name="contact" />
              <Stack.Screen name="+not-found" />
            </Stack>
          </MaintenanceProvider>
        </MessagesProvider>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Platform.OS === "web" ? "#F0EFF4" : colors.background,
    alignItems: "center",
  },
  app: {
    flex: 1,
    width: "100%",
    maxWidth: Platform.OS === "web" ? 480 : undefined,
    backgroundColor: colors.background,
    overflow: "hidden",
  },
});
