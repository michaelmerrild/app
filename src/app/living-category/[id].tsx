import { router, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { PaymentPage } from "@/components/payments-screen";
import { LivingRow, livingStyles } from "@/components/living-ui";
import { fitness, homeServices } from "@/data/living";
import NotFoundScreen from "../+not-found";
export default function LivingCategory() {
  const { id } = useLocalSearchParams<{ id: string }>();
  if (id !== "home" && id !== "offers") return <NotFoundScreen />;
  return (
    <PaymentPage
      title={id === "home" ? "Home Services" : "Special offers"}
      onBack={() => router.dismissTo("/living")}
    >
      <Text style={livingStyles.copy}>
        {id === "home"
          ? "Choose a service. Your home details are already taken care of."
          : "Discover packages and savings for Lamun residents."}
      </Text>
      {(id === "home" ? homeServices : [fitness]).map((item) => (
        <LivingRow
          key={item.id}
          title={item.name}
          description={
            item.id === "fitness"
              ? "Fitness First Terminal 21 · 650 m away. Memberships and training."
              : item.description
          }
          kind={
            item.id === "fitness"
              ? "fitness"
              : item.id === "laundry"
                ? "laundry"
                : item.id === "aircon"
                  ? "aircon"
                  : "housekeeping"
          }
          onPress={() =>
            router.push({ pathname: "/service/[id]", params: { id: item.id } })
          }
        />
      ))}
    </PaymentPage>
  );
}
