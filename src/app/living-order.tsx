import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { PaymentPage } from "@/components/payments-screen";
import { livingStyles } from "@/components/living-ui";
import { services } from "@/data/living";
import { formatBaht } from "@/data/payments";
import { colors } from "@/constants/theme";
import NotFoundScreen from "./+not-found";
export default function LivingOrder() {
  const params = useLocalSearchParams<{ service: string; package: string }>();
  const service = services.find((item) => item.id === params.service);
  const pkg = service?.packages.find((item) => item.id === params.package);
  if (!service || !pkg) return <NotFoundScreen />;
  return (
    <PaymentPage
      title="Order & payment"
      onBack={() =>
        router.dismissTo({
          pathname: "/service/[id]",
          params: { id: service.id },
        })
      }
    >
      <View style={{ paddingVertical: 24 }}>
        <Ionicons name="bag-handle-outline" size={36} color={colors.purple} />
        <Text style={[livingStyles.heading, { marginTop: 20 }]}>
          Ordering is coming soon
        </Text>
      </View>
      <View
        style={{
          padding: 22,
          backgroundColor: colors.lavender,
          borderRadius: 16,
          gap: 10,
        }}
      >
        <Text style={livingStyles.copy}>{service.name}</Text>
        <Text style={livingStyles.title}>{pkg.name}</Text>
        <Text style={livingStyles.title}>
          {formatBaht(pkg.price)} {pkg.unit}
        </Text>
        <Text style={livingStyles.copy}>{service.basis}</Text>
      </View>
    </PaymentPage>
  );
}
