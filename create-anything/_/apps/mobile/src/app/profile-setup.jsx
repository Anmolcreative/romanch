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
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import KeyboardAvoidingAnimatedView from "@/components/KeyboardAvoidingAnimatedView";
import { LinearGradient } from "expo-linear-gradient";
import { Camera, ArrowLeft, User, Minus, Plus } from "lucide-react-native";

export default function ProfileSetupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [profileData, setProfileData] = useState({
    avatar: null,
    name: "",
    pronouns: "",
    age: "",
    preferences: [],
    budget: 1000,
    safetyLevel: 3,
  });

  const travelPreferences = [
    "Adventure",
    "Food",
    "Photography",
    "Nature",
    "Nightlife",
    "Culture",
    "Solo vibes",
  ];

  const budgetOptions = [500, 1000, 2500, 5000, 10000, 25000, 50000];
  const safetyLevels = ["Low", "Moderate", "High", "Very High", "Maximum"];

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "We need camera roll permissions to select your photo.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setProfileData((prev) => ({ ...prev, avatar: result.assets[0].uri }));
    }
  };

  const handlePreferenceToggle = (preference) => {
    setProfileData((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter((p) => p !== preference)
        : [...prev.preferences, preference],
    }));
  };

  const handleBudgetChange = (direction) => {
    const currentIndex = budgetOptions.findIndex(
      (b) => b >= profileData.budget,
    );
    if (direction === "up" && currentIndex < budgetOptions.length - 1) {
      setProfileData((prev) => ({
        ...prev,
        budget: budgetOptions[currentIndex + 1],
      }));
    } else if (direction === "down" && currentIndex > 0) {
      setProfileData((prev) => ({
        ...prev,
        budget: budgetOptions[currentIndex - 1],
      }));
    }
  };

  const handleSafetyChange = (direction) => {
    if (direction === "up" && profileData.safetyLevel < 5) {
      setProfileData((prev) => ({
        ...prev,
        safetyLevel: prev.safetyLevel + 1,
      }));
    } else if (direction === "down" && profileData.safetyLevel > 1) {
      setProfileData((prev) => ({
        ...prev,
        safetyLevel: prev.safetyLevel - 1,
      }));
    }
  };

  const handleSubmit = () => {
    if (!profileData.name || !profileData.age) {
      Alert.alert("Error", "Please fill in your name and age");
      return;
    }

    if (profileData.preferences.length === 0) {
      Alert.alert("Error", "Please select at least one travel preference");
      return;
    }

    // Mock save profile data
    router.replace("/(tabs)");
  };

  const handleBack = () => {
    router.back();
  };

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

              <Text
                style={{
                  fontSize: 24,
                  fontFamily: "Poppins_600SemiBold",
                  color: isDark ? "#FFF9F4" : "#0F2C4C",
                }}
              >
                Set up your profile
              </Text>
            </View>

            {/* Avatar Section */}
            <View style={{ alignItems: "center", marginBottom: 40 }}>
              <TouchableOpacity
                onPress={handleImagePicker}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  backgroundColor: isDark
                    ? "rgba(255, 249, 244, 0.1)"
                    : "rgba(255, 255, 255, 0.8)",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 3,
                  borderColor: "#7ACFD6",
                  marginBottom: 16,
                  position: "relative",
                }}
              >
                {profileData.avatar ? (
                  <Image
                    source={{ uri: profileData.avatar }}
                    style={{ width: 114, height: 114, borderRadius: 57 }}
                    contentFit="cover"
                  />
                ) : (
                  <User size={40} color={isDark ? "#B7E4E3" : "#7ACFD6"} />
                )}

                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: "#7ACFD6",
                    borderWidth: 3,
                    borderColor: isDark ? "#1F2937" : "#FFF9F4",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Camera size={16} color="#FFF9F4" />
                </View>
              </TouchableOpacity>

              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins_400Regular",
                  color: isDark ? "#B7E4E3" : "#7ACFD6",
                  textAlign: "center",
                }}
              >
                Tap to add your photo
              </Text>
            </View>

            {/* Basic Info */}
            <View style={{ marginBottom: 30 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Poppins_600SemiBold",
                  color: isDark ? "#FFF9F4" : "#0F2C4C",
                  marginBottom: 20,
                }}
              >
                Basic Information
              </Text>

              <View style={{ marginBottom: 20 }}>
                <TextInput
                  style={{
                    backgroundColor: isDark
                      ? "rgba(255, 249, 244, 0.1)"
                      : "rgba(255, 249, 244, 0.8)",
                    borderRadius: 20,
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    fontSize: 16,
                    fontFamily: "Poppins_400Regular",
                    color: isDark ? "#FFF9F4" : "#0F2C4C",
                    borderWidth: 1,
                    borderColor: "rgba(122, 207, 214, 0.3)",
                  }}
                  placeholder="Full Name"
                  placeholderTextColor={isDark ? "#B7E4E3" : "#7ACFD6"}
                  value={profileData.name}
                  onChangeText={(text) =>
                    setProfileData((prev) => ({ ...prev, name: text }))
                  }
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 20,
                  gap: 12,
                }}
              >
                <View style={{ flex: 1 }}>
                  <TextInput
                    style={{
                      backgroundColor: isDark
                        ? "rgba(255, 249, 244, 0.1)"
                        : "rgba(255, 249, 244, 0.8)",
                      borderRadius: 20,
                      paddingHorizontal: 20,
                      paddingVertical: 16,
                      fontSize: 16,
                      fontFamily: "Poppins_400Regular",
                      color: isDark ? "#FFF9F4" : "#0F2C4C",
                      borderWidth: 1,
                      borderColor: "rgba(122, 207, 214, 0.3)",
                    }}
                    placeholder="Age"
                    placeholderTextColor={isDark ? "#B7E4E3" : "#7ACFD6"}
                    value={profileData.age}
                    onChangeText={(text) =>
                      setProfileData((prev) => ({ ...prev, age: text }))
                    }
                    keyboardType="numeric"
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <TextInput
                    style={{
                      backgroundColor: isDark
                        ? "rgba(255, 249, 244, 0.1)"
                        : "rgba(255, 249, 244, 0.8)",
                      borderRadius: 20,
                      paddingHorizontal: 20,
                      paddingVertical: 16,
                      fontSize: 16,
                      fontFamily: "Poppins_400Regular",
                      color: isDark ? "#FFF9F4" : "#0F2C4C",
                      borderWidth: 1,
                      borderColor: "rgba(122, 207, 214, 0.3)",
                    }}
                    placeholder="Pronouns"
                    placeholderTextColor={isDark ? "#B7E4E3" : "#7ACFD6"}
                    value={profileData.pronouns}
                    onChangeText={(text) =>
                      setProfileData((prev) => ({ ...prev, pronouns: text }))
                    }
                  />
                </View>
              </View>
            </View>

            {/* Travel Preferences */}
            <View style={{ marginBottom: 30 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Poppins_600SemiBold",
                  color: isDark ? "#FFF9F4" : "#0F2C4C",
                  marginBottom: 20,
                }}
              >
                Travel Preferences
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                {travelPreferences.map((preference) => {
                  const isSelected =
                    profileData.preferences.includes(preference);
                  return (
                    <TouchableOpacity
                      key={preference}
                      onPress={() => handlePreferenceToggle(preference)}
                      style={{
                        paddingHorizontal: 20,
                        paddingVertical: 12,
                        borderRadius: 20,
                        backgroundColor: isSelected
                          ? "#7ACFD6"
                          : isDark
                            ? "rgba(255, 249, 244, 0.1)"
                            : "rgba(255, 255, 255, 0.8)",
                        borderWidth: 1,
                        borderColor: isSelected
                          ? "#7ACFD6"
                          : "rgba(122, 207, 214, 0.3)",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "Poppins_500Medium",
                          color: isSelected
                            ? "#FFF9F4"
                            : isDark
                              ? "#B7E4E3"
                              : "#0F2C4C",
                        }}
                      >
                        {preference}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Budget Range */}
            <View style={{ marginBottom: 30 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Poppins_600SemiBold",
                  color: isDark ? "#FFF9F4" : "#0F2C4C",
                  marginBottom: 20,
                }}
              >
                Budget Range (per trip)
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 20,
                  marginBottom: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => handleBudgetChange("down")}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: isDark
                      ? "rgba(255, 249, 244, 0.1)"
                      : "rgba(255, 255, 255, 0.8)",
                    borderWidth: 1,
                    borderColor: "#7ACFD6",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Minus size={20} color="#7ACFD6" />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: "Poppins_600SemiBold",
                    color: "#7ACFD6",
                    minWidth: 120,
                    textAlign: "center",
                  }}
                >
                  ₹
                  {profileData.budget >= 50000
                    ? "50,000+"
                    : profileData.budget.toLocaleString()}
                </Text>

                <TouchableOpacity
                  onPress={() => handleBudgetChange("up")}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: isDark
                      ? "rgba(255, 249, 244, 0.1)"
                      : "rgba(255, 255, 255, 0.8)",
                    borderWidth: 1,
                    borderColor: "#7ACFD6",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Plus size={20} color="#7ACFD6" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Safety Level */}
            <View style={{ marginBottom: 40 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Poppins_600SemiBold",
                  color: isDark ? "#FFF9F4" : "#0F2C4C",
                  marginBottom: 20,
                }}
              >
                Safety Sensitivity Level
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 20,
                  marginBottom: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => handleSafetyChange("down")}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: isDark
                      ? "rgba(255, 249, 244, 0.1)"
                      : "rgba(255, 255, 255, 0.8)",
                    borderWidth: 1,
                    borderColor: "#7ACFD6",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Minus size={20} color="#7ACFD6" />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Poppins_500Medium",
                    color: "#7ACFD6",
                    minWidth: 120,
                    textAlign: "center",
                  }}
                >
                  {safetyLevels[profileData.safetyLevel - 1]}
                </Text>

                <TouchableOpacity
                  onPress={() => handleSafetyChange("up")}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: isDark
                      ? "rgba(255, 249, 244, 0.1)"
                      : "rgba(255, 255, 255, 0.8)",
                    borderWidth: 1,
                    borderColor: "#7ACFD6",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Plus size={20} color="#7ACFD6" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Continue Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                backgroundColor: "#0F2C4C",
                borderRadius: 24,
                paddingVertical: 18,
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
                  color: "#FFF9F4",
                }}
              >
                Complete Setup
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingAnimatedView>
    </LinearGradient>
  );
}
