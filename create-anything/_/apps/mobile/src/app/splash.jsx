import { View, Text, Animated, useColorScheme } from "react-native";
import { useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SplashScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const taglineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Tagline animation
      Animated.timing(taglineAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        // Navigate to welcome after animations
        setTimeout(() => {
          router.replace("/welcome");
        }, 1500);
      });
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? "#1F2937" : "#FFF9F4", // Cream background
        justifyContent: "center",
        alignItems: "center",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Logo Section */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          alignItems: "center",
          marginBottom: 60,
        }}
      >
        {/* Beige + Turquoise Background Shape */}
        <View
          style={{
            position: "absolute",
            width: 180,
            height: 120,
            backgroundColor: "#EEDFCB", // Sand Beige
            borderRadius: 60,
            transform: [{ rotate: "-15deg" }],
            top: -10,
            left: -20,
          }}
        />
        <View
          style={{
            position: "absolute",
            width: 140,
            height: 90,
            backgroundColor: "#B7E4E3", // Soft Aqua
            borderRadius: 45,
            transform: [{ rotate: "20deg" }],
            top: 10,
            right: -10,
          }}
        />

        {/* App Name */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            zIndex: 10,
          }}
        >
          <Text
            style={{
              fontSize: 48,
              fontFamily: "Poppins_600SemiBold",
              color: "#0F2C4C", // Deep Navy
              textShadowColor: "rgba(0,0,0,0.1)",
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 4,
            }}
          >
            ROM
          </Text>
          <Text
            style={{
              fontSize: 48,
              fontFamily: "NotoSansDevanagari_600SemiBold",
              color: "#0F2C4C", // Deep Navy
              textShadowColor: "rgba(0,0,0,0.1)",
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 4,
            }}
          >
            ांच
          </Text>
        </View>
      </Animated.View>

      {/* Tagline */}
      <Animated.View
        style={{
          opacity: taglineAnim,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Poppins_400Regular",
            color: isDark ? "#B7E4E3" : "#7ACFD6", // Turquoise Teal
            textAlign: "center",
            lineHeight: 28,
          }}
        >
          Travel. Connect. Feel the{" "}
          <Text
            style={{
              fontFamily: "NotoSansDevanagari_500Medium",
              color: isDark ? "#B7E4E3" : "#7ACFD6",
            }}
          >
            रोमांच
          </Text>
          .
        </Text>
      </Animated.View>

      {/* Subtle loading indicator */}
      <View
        style={{
          position: "absolute",
          bottom: insets.bottom + 60,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 40,
            height: 4,
            backgroundColor: isDark ? "#333" : "#EEDFCB",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Animated.View
            style={{
              width: "30%",
              height: "100%",
              backgroundColor: "#7ACFD6",
              borderRadius: 2,
              transform: [
                {
                  translateX: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 60],
                  }),
                },
              ],
            }}
          />
        </View>
      </View>
    </View>
  );
}
