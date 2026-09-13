import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@/constants/theme";
import { useMessages } from "@/state/messages";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { unreadCount } = useMessages();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.purple,
        tabBarInactiveTintColor: colors.secondary,
        tabBarLabelPosition: "below-icon",
        tabBarStyle: {
          height: 64 + Math.max(insets.bottom, 12),
          paddingTop: 8,
          paddingBottom: Math.max(insets.bottom, 12),
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          elevation: 0,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: "500", marginTop: 3 },
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "My home",
          tabBarAccessibilityLabel: "My home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarAccessibilityLabel: `Messages${unreadCount ? `, ${unreadCount} unread messages` : ""}`,
          tabBarBadge: unreadCount || undefined,
          tabBarBadgeStyle: {
            backgroundColor: colors.purple,
            color: "white",
            fontSize: 10,
          },
          tabBarIcon: ({ color, focused }) => (
            <>
              <Ionicons
                name={focused ? "chatbubble" : "chatbubble-outline"}
                size={24}
                color={color}
              />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="living"
        options={{
          title: "Living",
          tabBarAccessibilityLabel: "Living",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "grid" : "grid-outline"}
              size={23}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
