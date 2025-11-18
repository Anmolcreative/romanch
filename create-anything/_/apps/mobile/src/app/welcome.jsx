import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  useColorScheme,
} from "react-native";
import { useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MapPin, Users, Shield, Compass } from "lucide-react-native";

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGetStarted = () => {
    router.push("/auth");
  };

  return (
    <LinearGradient
      colors={isDark ? ["#1F2937", "#0F2C4C"] : ["#7ACFD6", "#0F2C4C"]}
      style={{ flex: 1 }}
    >
      <StatusBar style="light" />

      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingHorizontal: 24,
        }}
      >
        {/* Header Logo */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            alignItems: "center",
            marginTop: 60,
            marginBottom: 60,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "baseline",
            }}
          >
            <Text
              style={{
                fontSize: 36,
                fontFamily: "Poppins_600SemiBold",
                color: "#FFF9F4",
                textShadowColor: "rgba(0,0,0,0.3)",
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 3,
              }}
            >
              ROM
            </Text>
            <Text
              style={{
                fontSize: 36,
                fontFamily: "NotoSansDevanagari_600SemiBold",
                color: "#FFF9F4",
                textShadowColor: "rgba(0,0,0,0.3)",
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 3,
              }}
            >
              ांच
            </Text>
          </View>
        </Animated.View>

        {/* Main Content */}
        <Animated.View
          style={{
            flex: 1,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            justifyContent: "center",
          }}
        >
          {/* Welcome Text */}
          <View style={{ alignItems: "center", marginBottom: 50 }}>
            <Text
              style={{
                fontSize: 32,
                fontFamily: "Poppins_600SemiBold",
                color: "#FFF9F4",
                textAlign: "center",
                marginBottom: 16,
                lineHeight: 40,
              }}
            >
              Welcome to the future of travel
            </Text>

            <Text
              style={{
                fontSize: 18,
                fontFamily: "Poppins_400Regular",
                color: "#B7E4E3",
                textAlign: "center",
                lineHeight: 26,
                paddingHorizontal: 20,
              }}
            >
              Connect with travelers, discover hidden gems, and feel the{" "}
              <Text
                style={{
                  fontFamily: "NotoSansDevanagari_500Medium",
                  color: "#EEDFCB",
                }}
              >
                रोमांच
              </Text>{" "}
              of every journey
            </Text>
          </View>

          {/* Features */}
          <View style={{ marginBottom: 60 }}>
            {[
              { icon: MapPin, text: "AI-powered itineraries" },
              { icon: Users, text: "Connect with fellow travelers" },
              { icon: Shield, text: "Built-in safety features" },
              { icon: Compass, text: "Discover authentic experiences" },
            ].map((feature, index) => (
              <Animated.View
                key={index}
                style={{
                  opacity: fadeAnim,
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 50],
                        outputRange: [0, 20 + index * 10],
                      }),
                    },
                  ],
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                  paddingHorizontal: 20,
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: "rgba(255, 249, 244, 0.15)",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 16,
                  }}
                >
                  <feature.icon size={24} color="#B7E4E3" />
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Poppins_500Medium",
                    color: "#FFF9F4",
                    flex: 1,
                  }}
                >
                  {feature.text}
                </Text>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Get Started Button */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <TouchableOpacity
            onPress={handleGetStarted}
            style={{
              backgroundColor: "#FFF9F4",
              borderRadius: 28,
              paddingVertical: 18,
              paddingHorizontal: 32,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Poppins_600SemiBold",
                color: "#0F2C4C",
              }}
            >
              Get Started
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}
