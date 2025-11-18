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
import {
  ArrowLeft,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Sparkles,
  Shield,
} from "lucide-react-native";

const vibeOptions = [
  { id: "adventure", label: "Adventure", emoji: "🏔️" },
  { id: "culture", label: "Culture", emoji: "🏛️" },
  { id: "food", label: "Food", emoji: "🍜" },
  { id: "nature", label: "Nature", emoji: "🌿" },
  { id: "photography", label: "Photography", emoji: "📸" },
  { id: "nightlife", label: "Nightlife", emoji: "🌃" },
  { id: "solo", label: "Solo vibes", emoji: "🎒" },
  { id: "relaxation", label: "Relaxation", emoji: "🧘" },
];

const safetyLevels = [
  { level: 1, label: "Low", description: "I can handle any adventure" },
  { level: 2, label: "Moderate", description: "Some adventure is fine" },
  { level: 3, label: "High", description: "Prefer safer experiences" },
  { level: 4, label: "Very High", description: "Safety is my top priority" },
  { level: 5, label: "Maximum", description: "Only the safest options" },
];

export default function ItineraryInputScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    travelVibes: [],
    safetyLevel: 3,
    additionalNotes: "",
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleVibeToggle = (vibeId) => {
    setFormData((prev) => ({
      ...prev,
      travelVibes: prev.travelVibes.includes(vibeId)
        ? prev.travelVibes.filter((v) => v !== vibeId)
        : [...prev.travelVibes, vibeId],
    }));
  };

  const handleSafetyLevelChange = (level) => {
    setFormData((prev) => ({ ...prev, safetyLevel: level }));
  };

  const handleGenerateItinerary = async () => {
    // Validate form
    if (
      !formData.destination ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.budget
    ) {
      Alert.alert("Missing Information", "Please fill in all required fields.");
      return;
    }

    if (formData.travelVibes.length === 0) {
      Alert.alert(
        "Travel Vibes Required",
        "Please select at least one travel vibe.",
      );
      return;
    }

    setIsGenerating(true);

    try {
      // Mock API call
      const mockItinerary = {
        id: Date.now(),
        destination: formData.destination,
        startDate: formData.startDate,
        endDate: formData.endDate,
        budget: formData.budget,
        vibes: formData.travelVibes,
        safetyLevel: formData.safetyLevel,
      };

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      router.push({
        pathname: "/itinerary-result",
        params: { data: JSON.stringify(mockItinerary) },
      });
    } catch (error) {
      Alert.alert("Error", "Failed to generate itinerary. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const selectedSafetyLevel = safetyLevels.find(
    (s) => s.level === formData.safetyLevel,
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

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: "Poppins_600SemiBold",
                    color: isDark ? "#FFF9F4" : "#0F2C4C",
                    marginBottom: 4,
                  }}
                >
                  Plan Your Adventure
                </Text>

                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Poppins_400Regular",
                    color: isDark ? "#B7E4E3" : "#7ACFD6",
                  }}
                >
                  AI-powered itinerary generation
                </Text>
              </View>

              <Sparkles size={28} color="#7ACFD6" />
            </View>

            {/* Destination */}
            <View style={{ marginBottom: 24 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins_600SemiBold",
                  color: isDark ? "#FFF9F4" : "#0F2C4C",
                  marginBottom: 12,
                }}
              >
                Where do you want to go? *
              </Text>

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
                <MapPin size={20} color={isDark ? "#B7E4E3" : "#7ACFD6"} />
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 16,
                    fontFamily: "Poppins_400Regular",
                    color: isDark ? "#FFF9F4" : "#0F2C4C",
                    marginLeft: 12,
                  }}
                  placeholder="Enter destination (e.g., Goa, India)"
                  placeholderTextColor={isDark ? "#B7E4E3" : "#7ACFD6"}
                  value={formData.destination}
                  onChangeText={(text) =>
                    setFormData((prev) => ({ ...prev, destination: text }))
                  }
                />
              </View>
            </View>

            {/* Dates */}
            <View style={{ marginBottom: 24 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins_600SemiBold",
                  color: isDark ? "#FFF9F4" : "#0F2C4C",
                  marginBottom: 12,
                }}
              >
                When are you traveling? *
              </Text>

              <View style={{ flexDirection: "row", gap: 12 }}>
                <View style={{ flex: 1 }}>
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
                    <Calendar
                      size={20}
                      color={isDark ? "#B7E4E3" : "#7ACFD6"}
                    />
                    <TextInput
                      style={{
                        flex: 1,
                        fontSize: 16,
                        fontFamily: "Poppins_400Regular",
                        color: isDark ? "#FFF9F4" : "#0F2C4C",
                        marginLeft: 12,
                      }}
                      placeholder="Start Date"
                      placeholderTextColor={isDark ? "#B7E4E3" : "#7ACFD6"}
                      value={formData.startDate}
                      onChangeText={(text) =>
                        setFormData((prev) => ({ ...prev, startDate: text }))
                      }
                    />
                  </View>
                </View>

                <View style={{ flex: 1 }}>
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
                    <Calendar
                      size={20}
                      color={isDark ? "#B7E4E3" : "#7ACFD6"}
                    />
                    <TextInput
                      style={{
                        flex: 1,
                        fontSize: 16,
                        fontFamily: "Poppins_400Regular",
                        color: isDark ? "#FFF9F4" : "#0F2C4C",
                        marginLeft: 12,
                      }}
                      placeholder="End Date"
                      placeholderTextColor={isDark ? "#B7E4E3" : "#7ACFD6"}
                      value={formData.endDate}
                      onChangeText={(text) =>
                        setFormData((prev) => ({ ...prev, endDate: text }))
                      }
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* Budget */}
            <View style={{ marginBottom: 24 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins_600SemiBold",
                  color: isDark ? "#FFF9F4" : "#0F2C4C",
                  marginBottom: 12,
                }}
              >
                What's your budget? *
              </Text>

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
                <DollarSign size={20} color={isDark ? "#B7E4E3" : "#7ACFD6"} />
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 16,
                    fontFamily: "Poppins_400Regular",
                    color: isDark ? "#FFF9F4" : "#0F2C4C",
                    marginLeft: 12,
                  }}
                  placeholder="Total budget (e.g., ₹20,000)"
                  placeholderTextColor={isDark ? "#B7E4E3" : "#7ACFD6"}
                  value={formData.budget}
                  onChangeText={(text) =>
                    setFormData((prev) => ({ ...prev, budget: text }))
                  }
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Travel Vibes */}
            <View style={{ marginBottom: 24 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins_600SemiBold",
                  color: isDark ? "#FFF9F4" : "#0F2C4C",
                  marginBottom: 12,
                }}
              >
                What vibes are you looking for? *
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                {vibeOptions.map((vibe) => {
                  const isSelected = formData.travelVibes.includes(vibe.id);
                  return (
                    <TouchableOpacity
                      key={vibe.id}
                      onPress={() => handleVibeToggle(vibe.id)}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 16,
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
                      <Text style={{ fontSize: 16, marginRight: 8 }}>
                        {vibe.emoji}
                      </Text>
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
                        {vibe.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Safety Level */}
            <View style={{ marginBottom: 24 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins_600SemiBold",
                  color: isDark ? "#FFF9F4" : "#0F2C4C",
                  marginBottom: 12,
                }}
              >
                Safety Preference
              </Text>

              <View
                style={{
                  backgroundColor: isDark
                    ? "rgba(255, 249, 244, 0.1)"
                    : "rgba(255, 255, 255, 0.8)",
                  borderRadius: 20,
                  padding: 20,
                  borderWidth: 1,
                  borderColor: "rgba(122, 207, 214, 0.3)",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <Shield size={20} color="#7ACFD6" />
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Poppins_600SemiBold",
                      color: "#7ACFD6",
                      marginLeft: 8,
                    }}
                  >
                    {selectedSafetyLevel?.label} Safety
                  </Text>
                </View>

                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Poppins_400Regular",
                    color: isDark ? "#B7E4E3" : "#7ACFD6",
                    marginBottom: 16,
                  }}
                >
                  {selectedSafetyLevel?.description}
                </Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={{ flexDirection: "row", gap: 12 }}>
                    {safetyLevels.map((safety) => (
                      <TouchableOpacity
                        key={safety.level}
                        onPress={() => handleSafetyLevelChange(safety.level)}
                        style={{
                          paddingHorizontal: 16,
                          paddingVertical: 8,
                          borderRadius: 16,
                          backgroundColor:
                            formData.safetyLevel === safety.level
                              ? "#7ACFD6"
                              : "transparent",
                          borderWidth: 1,
                          borderColor: "#7ACFD6",
                          minWidth: 80,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: "Poppins_500Medium",
                            color:
                              formData.safetyLevel === safety.level
                                ? "#FFF9F4"
                                : "#7ACFD6",
                            textAlign: "center",
                          }}
                        >
                          {safety.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </View>

            {/* Additional Notes */}
            <View style={{ marginBottom: 40 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins_600SemiBold",
                  color: isDark ? "#FFF9F4" : "#0F2C4C",
                  marginBottom: 12,
                }}
              >
                Additional Notes (Optional)
              </Text>

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
                  height: 100,
                  textAlignVertical: "top",
                }}
                placeholder="Any specific requirements or preferences?"
                placeholderTextColor={isDark ? "#B7E4E3" : "#7ACFD6"}
                multiline
                value={formData.additionalNotes}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, additionalNotes: text }))
                }
              />
            </View>

            {/* Generate Button */}
            <TouchableOpacity
              onPress={handleGenerateItinerary}
              disabled={isGenerating}
              style={{
                backgroundColor: isGenerating ? "#7ACFD6" : "#0F2C4C",
                borderRadius: 24,
                paddingVertical: 18,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
                opacity: isGenerating ? 0.8 : 1,
              }}
            >
              <Sparkles size={20} color="#FFF9F4" />
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Poppins_600SemiBold",
                  color: "#FFF9F4",
                  marginLeft: 8,
                }}
              >
                {isGenerating ? "Generating..." : "Generate My Itinerary"}
              </Text>
            </TouchableOpacity>

            {isGenerating && (
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins_400Regular",
                  color: isDark ? "#B7E4E3" : "#7ACFD6",
                  textAlign: "center",
                  marginTop: 12,
                }}
              >
                Creating your perfect adventure... This may take a moment
              </Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingAnimatedView>
    </LinearGradient>
  );
}
