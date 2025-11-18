import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  useColorScheme,
} from "react-native";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import KeyboardAvoidingAnimatedView from "@/components/KeyboardAvoidingAnimatedView";
import { LinearGradient } from "expo-linear-gradient";
import { Mail, Phone, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react-native";

export default function AuthScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [isLogin, setIsLogin] = useState(true);
  const [authType, setAuthType] = useState("email"); // 'email' or 'phone'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const handleSubmit = () => {
    // Mock authentication
    if (isLogin) {
      // Login logic
      if (!formData[authType] || !formData.password) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }
    } else {
      // Signup logic
      if (
        !formData.name ||
        !formData[authType] ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        Alert.alert("Error", "Passwords do not match");
        return;
      }
    }

    // Navigate to profile setup for new users or main app for existing users
    if (isLogin) {
      router.replace("/(tabs)");
    } else {
      router.push("/profile-setup");
    }
  };

  const handleBack = () => {
    router.back();
  };

  const renderInput = (field, placeholder, icon, secureTextEntry = false) => (
    <View
      style={{
        marginBottom: 20,
        position: "relative",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: isDark
            ? "rgba(255, 249, 244, 0.1)"
            : "rgba(255, 249, 244, 0.8)",
          borderRadius: 20,
          paddingHorizontal: 20,
          paddingVertical: 16,
          borderWidth: 1,
          borderColor: "rgba(122, 207, 214, 0.3)",
        }}
      >
        <View
          style={{
            width: 24,
            height: 24,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 12,
          }}
        >
          {icon}
        </View>

        <TextInput
          style={{
            flex: 1,
            fontSize: 16,
            fontFamily: "Poppins_400Regular",
            color: isDark ? "#FFF9F4" : "#0F2C4C",
          }}
          placeholder={placeholder}
          placeholderTextColor={isDark ? "#B7E4E3" : "#7ACFD6"}
          value={formData[field]}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, [field]: text }))
          }
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={
            field === "email"
              ? "email-address"
              : field === "phone"
                ? "phone-pad"
                : "default"
          }
          autoCapitalize={
            field === "email" ? "none" : field === "name" ? "words" : "none"
          }
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{ marginLeft: 12 }}
          >
            {showPassword ? (
              <EyeOff size={20} color={isDark ? "#B7E4E3" : "#7ACFD6"} />
            ) : (
              <Eye size={20} color={isDark ? "#B7E4E3" : "#7ACFD6"} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={isDark ? ["#1F2937", "#0F2C4C"] : ["#FFF9F4", "#B7E4E3"]}
      style={{ flex: 1 }}
    >
      <StatusBar style={isDark ? "light" : "dark"} />

      <KeyboardAvoidingAnimatedView style={{ flex: 1 }} behavior="padding">
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              paddingTop: insets.top + 20,
              paddingBottom: insets.bottom + 20,
              paddingHorizontal: 24,
              flex: 1,
            }}
          >
            {/* Header */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 40,
              }}
            >
              <TouchableOpacity
                onPress={handleBack}
                style={{ marginRight: 16 }}
              >
                <ArrowLeft size={24} color={isDark ? "#FFF9F4" : "#0F2C4C"} />
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: "Poppins_600SemiBold",
                    color: isDark ? "#FFF9F4" : "#0F2C4C",
                  }}
                >
                  ROM
                </Text>
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: "NotoSansDevanagari_600SemiBold",
                    color: isDark ? "#FFF9F4" : "#0F2C4C",
                  }}
                >
                  ांच
                </Text>
              </View>
            </View>

            {/* Auth Type Toggle */}
            <View
              style={{
                flexDirection: "row",
                backgroundColor: isDark
                  ? "rgba(255, 249, 244, 0.1)"
                  : "rgba(255, 255, 255, 0.7)",
                borderRadius: 20,
                padding: 4,
                marginBottom: 30,
              }}
            >
              {["email", "phone"].map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setAuthType(type)}
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderRadius: 16,
                    backgroundColor:
                      authType === type ? "#7ACFD6" : "transparent",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Poppins_500Medium",
                      color:
                        authType === type
                          ? "#FFF9F4"
                          : isDark
                            ? "#B7E4E3"
                            : "#0F2C4C",
                      textAlign: "center",
                    }}
                  >
                    {type === "email" ? "Email" : "Phone"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Form */}
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 28,
                  fontFamily: "Poppins_600SemiBold",
                  color: isDark ? "#FFF9F4" : "#0F2C4C",
                  marginBottom: 8,
                }}
              >
                {isLogin ? "Welcome back!" : "Join the adventure"}
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins_400Regular",
                  color: isDark ? "#B7E4E3" : "#7ACFD6",
                  marginBottom: 40,
                  lineHeight: 24,
                }}
              >
                {isLogin
                  ? "Sign in to continue your journey"
                  : "Create your account and start exploring"}
              </Text>

              {!isLogin &&
                renderInput(
                  "name",
                  "Full Name",
                  <Mail size={20} color={isDark ? "#B7E4E3" : "#7ACFD6"} />,
                )}

              {renderInput(
                authType,
                authType === "email" ? "Email Address" : "Phone Number",
                authType === "email" ? (
                  <Mail size={20} color={isDark ? "#B7E4E3" : "#7ACFD6"} />
                ) : (
                  <Phone size={20} color={isDark ? "#B7E4E3" : "#7ACFD6"} />
                ),
              )}

              {renderInput(
                "password",
                "Password",
                <Lock size={20} color={isDark ? "#B7E4E3" : "#7ACFD6"} />,
                true,
              )}

              {!isLogin &&
                renderInput(
                  "confirmPassword",
                  "Confirm Password",
                  <Lock size={20} color={isDark ? "#B7E4E3" : "#7ACFD6"} />,
                  true,
                )}

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  backgroundColor: "#0F2C4C",
                  borderRadius: 24,
                  paddingVertical: 18,
                  alignItems: "center",
                  marginTop: 20,
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
                    color: "#FFF9F4",
                  }}
                >
                  {isLogin ? "Sign In" : "Create Account"}
                </Text>
              </TouchableOpacity>

              {/* Toggle Auth Mode */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 30,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Poppins_400Regular",
                    color: isDark ? "#B7E4E3" : "#7ACFD6",
                  }}
                >
                  {isLogin
                    ? "Don't have an account? "
                    : "Already have an account? "}
                </Text>
                <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Poppins_600SemiBold",
                      color: isDark ? "#FFF9F4" : "#0F2C4C",
                    }}
                  >
                    {isLogin ? "Sign Up" : "Sign In"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingAnimatedView>
    </LinearGradient>
  );
}
