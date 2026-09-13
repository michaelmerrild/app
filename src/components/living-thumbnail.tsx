import { View } from "react-native";
import { fitnessLogo } from "@/constants/fitness-logo";
import Svg, { Rect, Circle, Path, SvgXml } from "react-native-svg";
export type ThumbnailKind =
  | "home"
  | "internet"
  | "offers"
  | "fitness"
  | "housekeeping"
  | "laundry"
  | "aircon";
export function LivingThumbnail({ kind }: { kind: ThumbnailKind }) {
  if (kind === "fitness")
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 8,
          backgroundColor: "white",
        }}
      >
        <SvgXml xml={fitnessLogo} width="100%" height="100%" />
      </View>
    );
  return (
    <Svg width="100%" height="100%" viewBox="0 0 120 100">
      <Rect
        width="120"
        height="100"
        fill={
          kind === "home"
            ? "#EDE8DF"
            : kind === "internet"
              ? "#E5EADC"
              : "#E7E2EF"
        }
      />
      <Circle cx="99" cy="12" r="42" fill="white" opacity="0.3" />
      {kind === "housekeeping" ? (
        <>
          <Path
            d="M67 20L49 63"
            stroke="#827965"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <Path d="M36 58L66 69L58 88L25 76Z" fill="#ACA086" />
          <Path d="M42 66L34 78M51 70L44 82" stroke="#EDE8DF" strokeWidth="3" />
          <Path d="M88 30v18m-9-9h18" stroke="#9C8CBA" strokeWidth="3" />
        </>
      ) : kind === "laundry" ? (
        <>
          <Rect x="31" y="16" width="58" height="72" rx="8" fill="#FAFAFC" />
          <Circle cx="60" cy="58" r="20" fill="#A9BBC6" />
          <Circle cx="60" cy="58" r="14" fill="#DBE7EC" />
          <Path
            d="M47 58Q60 48 73 59"
            fill="none"
            stroke="#A9BBC6"
            strokeWidth="3"
          />
          <Circle cx="78" cy="27" r="3" fill="#8E9BA8" />
          <Path d="M40 27h13" stroke="#8E9BA8" strokeWidth="3" />
        </>
      ) : kind === "aircon" ? (
        <>
          <Rect x="16" y="24" width="88" height="35" rx="8" fill="#FAFAFC" />
          <Path d="M26 47h68M26 52h68" stroke="#A2B8BE" strokeWidth="2" />
          <Path
            d="M39 67q-7 10 0 19M60 67q-7 10 0 19M81 67q-7 10 0 19"
            stroke="#94B5BE"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </>
      ) : kind === "home" ? (
        <>
          <Rect x="16" y="21" width="36" height="33" rx="2" fill="#FCFAF7" />
          <Path d="M34 21v33M16 37h36" stroke="#D4CBBE" strokeWidth="2" />
          <Rect x="33" y="53" width="62" height="24" rx="7" fill="#A8A087" />
          <Rect x="27" y="63" width="10" height="17" rx="4" fill="#8C8571" />
          <Rect x="91" y="63" width="10" height="17" rx="4" fill="#8C8571" />
          <Path d="M34 80v6m60-6v6" stroke="#625C50" strokeWidth="3" />
          <Rect x="68" y="59" width="18" height="15" rx="3" fill="#F2EEE6" />
        </>
      ) : kind === "internet" ? (
        <>
          <Path
            d="M31 31Q60 6 89 31M41 42Q60 25 79 42M51 52Q60 44 69 52"
            fill="none"
            stroke="#77875C"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <Rect x="26" y="64" width="68" height="21" rx="7" fill="#FAFBF7" />
          <Path
            d="M36 64V49m48 15V49"
            stroke="#FAFBF7"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <Circle cx="78" cy="75" r="2" fill="#77875C" />
          <Circle cx="85" cy="75" r="2" fill="#A1B083" />
        </>
      ) : (
        <>
          <Path d="M23 29L61 22L99 60L64 88L23 49Z" fill="#8976A9" />
          <Circle cx="37" cy="37" r="5" fill="#E7E2EF" />
          <Path
            d="M64 44L76 67"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <Circle cx="58" cy="54" r="3" fill="white" />
          <Circle cx="81" cy="56" r="3" fill="white" />
        </>
      )}
    </Svg>
  );
}
