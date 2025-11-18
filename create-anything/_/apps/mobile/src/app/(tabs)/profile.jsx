import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Alert,
} from "react-native";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
  User,
  Camera,
  Settings,
  MapPin,
  Calendar,
  Star,
  Heart,
  Bookmark,
  Share2,
  Edit3,
  LogOut,
  Bell,
  Shield,
  HelpCircle,
  Globe,
  Moon,
  Sun,
  ChevronRight,
} from "lucide-react-native";

const mockUser = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  age: 26,
  pronouns: "they/them",
  location: "Mumbai, India",
  avatar:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face",
  bio: "Adventure seeker • Culture enthusiast • Solo traveler exploring incredible India 🇮🇳",
  joinDate: "March 2024",
  stats: {
    trips: 8,
    countries: 12,
    followers: 256,
    following: 189,
  },
  badges: [
    { name: "Explorer", icon: "🗺️", description: "Visited 10+ destinations" },
    { name: "Photographer", icon: "📸", description: "Shared 50+ photos" },
    {
      name: "Culture Lover",
      icon: "🏛️",
      description: "Visited 5+ cultural sites",
    },
    {
      name: "Solo Traveler",
      icon: "🎒",
      description: "Completed 5+ solo trips",
    },
  ],
  preferences: ["Adventure", "Culture", "Photography", "Solo vibes"],
  savedPlaces: 23,
  sharedItineraries: 5,
};

const settingSections = [
  {
    title: "Account",
    items: [
      {
        icon: User,
        title: "Edit Profile",
        subtitle: "Update your personal information",
        route: "/profile-setup",
      },
      {
        icon: Bell,
        title: "Notifications",
        subtitle: "Manage your alerts and updates",
        route: "/notifications-settings",
      },
      {
        icon: Shield,
        title: "Privacy & Safety",
        subtitle: "Control your privacy settings",
        route: "/safety-settings",
      },
    ],
  },
  {
    title: "App Settings",
    items: [
      {
        icon: Globe,
        title: "Language",
        subtitle: "English (India)",
        route: "/language-settings",
      },
      {
        icon: Moon,
        title: "Dark Mode",
        subtitle: "Currently following system",
        action: "theme",
      },
      {
        icon: HelpCircle,
        title: "Help & Support",
        subtitle: "Get help and contact support",
        route: "/help",
      },
    ],
  },
];

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [showStats, setShowStats] = useState(true);

  const handleSettingPress = (item) => {
    if (item.action === "theme") {
      // Toggle theme (mock)
      Alert.alert("Theme Settings", "Theme preferences updated!");
    } else if (item.route) {
      router.push(item.route);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out of your account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: () => {
            router.replace("/welcome");
          },
        },
      ],
    );
  };

  const handleEditProfile = () => {
    router.push("/profile-setup");
  };

  const handleShare = () => {
    Alert.alert("Share Profile", "Profile link copied to clipboard!");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? "#121212" : "#FFF9F4",
      }}
    >
      <StatusBar style={isDark ? "light" : "dark"} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Gradient */}
        <LinearGradient
          colors={isDark ? ["#1F2937", "#0F2C4C"] : ["#7ACFD6", "#0F2C4C"]}
          style={{
            paddingTop: insets.top + 20,
            paddingHorizontal: 20,
            paddingBottom: 30,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                fontSize: 28,
                fontFamily: "Poppins_600SemiBold",
                color: "#FFF9F4",
              }}
            >
              Profile
            </Text>

            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity
                onPress={handleShare}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "rgba(255, 249, 244, 0.2)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Share2 size={20} color="#FFF9F4" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleEditProfile}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "rgba(255, 249, 244, 0.2)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Edit3 size={20} color="#FFF9F4" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Profile Section */}
          <View style={{ alignItems: "center" }}>
            <View style={{ position: "relative", marginBottom: 16 }}>
              <Image
                source={{ uri: mockUser.avatar }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  borderWidth: 4,
                  borderColor: "#FFF9F4",
                }}
                contentFit="cover"
              />

              <TouchableOpacity
                onPress={handleEditProfile}
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: "#7ACFD6",
                  borderWidth: 3,
                  borderColor: "#FFF9F4",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Camera size={14} color="#FFF9F4" />
              </TouchableOpacity>
            </View>

            <Text
              style={{
                fontSize: 24,
                fontFamily: "Poppins_600SemiBold",
                color: "#FFF9F4",
                marginBottom: 4,
                textAlign: "center",
              }}
            >
              {mockUser.name}
            </Text>

            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins_400Regular",
                color: "#B7E4E3",
                marginBottom: 12,
              }}
            >
              {mockUser.age} • {mockUser.pronouns}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <MapPin size={16} color="#B7E4E3" />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins_400Regular",
                  color: "#B7E4E3",
                  marginLeft: 6,
                }}
              >
                {mockUser.location}
              </Text>
            </View>

            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins_400Regular",
                color: "#EEDFCB",
                textAlign: "center",
                lineHeight: 20,
                paddingHorizontal: 20,
              }}
            >
              {mockUser.bio}
            </Text>
          </View>
        </LinearGradient>

        {/* Stats Section */}
        <View
          style={{
            marginHorizontal: 20,
            marginTop: -20,
            padding: 20,
            borderRadius: 20,
            backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            {[
              { label: "Trips", value: mockUser.stats.trips },
              { label: "Countries", value: mockUser.stats.countries },
              { label: "Followers", value: mockUser.stats.followers },
              { label: "Following", value: mockUser.stats.following },
            ].map((stat, index) => (
              <View key={index} style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Poppins_600SemiBold",
                    color: "#7ACFD6",
                    marginBottom: 4,
                  }}
                >
                  {stat.value}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Poppins_500Medium",
                    color: isDark ? "#B7E4E3" : "#0F2C4C",
                  }}
                >
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Travel Preferences */}
        <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Poppins_600SemiBold",
              color: isDark ? "#FFF9F4" : "#0F2C4C",
              marginBottom: 16,
            }}
          >
            Travel Vibes
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            {mockUser.preferences.map((pref, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: "#7ACFD6",
                  borderRadius: 16,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Poppins_500Medium",
                    color: "#FFF9F4",
                  }}
                >
                  {pref}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Achievement Badges */}
        <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Poppins_600SemiBold",
              color: isDark ? "#FFF9F4" : "#0F2C4C",
              marginBottom: 16,
            }}
          >
            Achievement Badges
          </Text>

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            {mockUser.badges.map((badge, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  width: "48%",
                  padding: 16,
                  borderRadius: 16,
                  backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 32,
                    marginBottom: 8,
                  }}
                >
                  {badge.icon}
                </Text>

                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Poppins_600SemiBold",
                    color: isDark ? "#FFF9F4" : "#0F2C4C",
                    textAlign: "center",
                    marginBottom: 4,
                  }}
                >
                  {badge.name}
                </Text>

                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: "Poppins_400Regular",
                    color: isDark ? "#B7E4E3" : "#7ACFD6",
                    textAlign: "center",
                    lineHeight: 14,
                  }}
                >
                  {badge.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Settings Sections */}
        {settingSections.map((section, sectionIndex) => (
          <View
            key={sectionIndex}
            style={{ paddingHorizontal: 20, marginBottom: 30 }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Poppins_600SemiBold",
                color: isDark ? "#FFF9F4" : "#0F2C4C",
                marginBottom: 16,
              }}
            >
              {section.title}
            </Text>

            {section.items.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSettingPress(item)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 16,
                  marginBottom: 8,
                  borderRadius: 16,
                  backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#7ACFD6",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 12,
                  }}
                >
                  <item.icon size={20} color="#FFF9F4" />
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Poppins_600SemiBold",
                      color: isDark ? "#FFF9F4" : "#0F2C4C",
                      marginBottom: 2,
                    }}
                  >
                    {item.title}
                  </Text>

                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Poppins_400Regular",
                      color: isDark ? "#B7E4E3" : "#7ACFD6",
                    }}
                  >
                    {item.subtitle}
                  </Text>
                </View>

                <ChevronRight
                  size={20}
                  color={isDark ? "#B7E4E3" : "#7ACFD6"}
                />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Sign Out Button */}
        <View
          style={{ paddingHorizontal: 20, marginBottom: insets.bottom + 100 }}
        >
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
              borderRadius: 16,
              backgroundColor: isDark ? "#991B1B" : "#FEF2F2",
              borderWidth: 1,
              borderColor: "#DC2626",
            }}
          >
            <LogOut size={20} color="#DC2626" />
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Poppins_600SemiBold",
                color: "#DC2626",
                marginLeft: 8,
              }}
            >
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View
          style={{
            alignItems: "center",
            paddingHorizontal: 20,
            paddingBottom: insets.bottom + 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "baseline",
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Poppins_600SemiBold",
                color: isDark ? "#B7E4E3" : "#7ACFD6",
              }}
            >
              ROM
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "NotoSansDevanagari_600SemiBold",
                color: isDark ? "#B7E4E3" : "#7ACFD6",
              }}
            >
              ांच
            </Text>
          </View>

          <Text
            style={{
              fontSize: 12,
              fontFamily: "Poppins_400Regular",
              color: isDark ? "#B7E4E3" : "#7ACFD6",
              textAlign: "center",
            }}
          >
            Version 1.0.0 • Member since {mockUser.joinDate}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
