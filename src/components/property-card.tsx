import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, View } from "react-native";

import { demoTenancy } from "@/data/demo";

export function PropertyCard() {
  return (
    <View style={styles.card}>
      <Image
        source={require("../../assets/images/condo.jpg")}
        style={styles.photo}
        resizeMode="cover"
        accessible={false}
      />
      <LinearGradient
        colors={["#E8EEF2", "rgba(232,238,242,0.94)", "rgba(232,238,242,0.38)"]}
        locations={[0, 0.35, 1]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.copy}>
        <Text style={styles.title}>{demoTenancy.building}</Text>
        <Text style={styles.subtitle}>
          Unit {demoTenancy.unit} · {demoTenancy.city}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 116,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#E8EEF2",
    justifyContent: "center",
  },
  photo: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0.4,
  },
  copy: { paddingHorizontal: 18, paddingVertical: 26 },
  title: {
    fontSize: 23,
    lineHeight: 30,
    letterSpacing: -0.6,
    fontWeight: "700",
    color: "#253342",
  },
  subtitle: { fontSize: 15, lineHeight: 22, marginTop: 4, color: "#5D6B78" },
});
