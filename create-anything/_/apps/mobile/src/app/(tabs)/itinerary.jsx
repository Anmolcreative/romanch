import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Animated,
} from "react-native";
import { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  Plus,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Users,
  Compass,
  BookOpen,
  Star,
} from "lucide-react-native";

const mockItineraries = [
  {
    id: 1,
    title: "Goa Beach Adventure",
    destination: "Goa, India",
    dates: "15-18 Dec 2024",
    duration: "4 days",
    budget: "₹15,000",
    status: "upcoming",
    progress: 0.8,
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=200&fit=crop",
  },
  {
    id: 2,
    title: "Himalayan Trek",
    destination: "Manali, HP",
    dates: "22-28 Jan 2025",
    duration: "7 days",
    budget: "₹25,000",
    status: "planning",
    progress: 0.3,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop",
  },
  {
    id: 3,
    title: "Kerala Backwater Cruise",
    destination: "Kerala, India",
    dates: "10-14 Nov 2024",
    duration: "5 days",
    budget: "₹18,000",
    status: "completed",
    progress: 1.0,
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=200&fit=crop",
  },
];

const quickActions = [
  {
    icon: Plus,
    title: "New Trip",
    subtitle: "Plan your next adventure",
    color: "#7ACFD6",
    action: "create",
  },
  {
    icon: Compass,
    title: "Explore",
    subtitle: "Discover destinations",
    color: "#EEDFCB",
    action: "explore",
  },
  {
    icon: BookOpen,
    title: "My Trips",
    subtitle: "View saved itineraries",
    color: "#B7E4E3",
    action: "trips",
  },
];

export default function ItineraryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const scrollY = useRef(new Animated.Value(0)).current;

  const [activeTab, setActiveTab] = useState("all");

  const filteredItineraries = mockItineraries.filter((item) => {
    if (activeTab === "all") return true;
    return item.status === activeTab;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "#7ACFD6";
      case "planning":
        return "#EEDFCB";
      case "completed":
        return "#B7E4E3";
      default:
        return "#7ACFD6";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "upcoming":
        return "Upcoming";
      case "planning":
        return "Planning";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case "create":
        router.push("/itinerary-input");
        break;
      case "explore":
        router.push("/(tabs)/explore");
        break;
      case "trips":
        setActiveTab("all");
        break;
    }
  };

  const renderItineraryCard = (item) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => router.push(`/itinerary-result?id=${item.id}`)}
      style={{
        marginBottom: 16,
        borderRadius: 24,
        backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        overflow: "hidden",
      }}
    >
      {/* Header with gradient background */}
      <LinearGradient
        colors={["#7ACFD6", "#0F2C4C"]}
        style={{
          padding: 20,
          position: "relative",
        }}
      >
        <View style={{ position: "absolute", top: 16, right: 16 }}>
          <View
            style={{
              backgroundColor: "rgba(255, 249, 244, 0.2)",
              borderRadius: 12,
              paddingHorizontal: 8,
              paddingVertical: 4,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontFamily: "Poppins_600SemiBold",
                color: "#FFF9F4",
                textTransform: "uppercase",
              }}
            >
              {getStatusText(item.status)}
            </Text>
          </View>
        </View>

        <Text
          style={{
            fontSize: 20,
            fontFamily: "Poppins_600SemiBold",
            color: "#FFF9F4",
            marginBottom: 8,
            marginRight: 80,
          }}
        >
          {item.title}
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
            {item.destination}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Calendar size={14} color="#EEDFCB" />
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Poppins_500Medium",
                color: "#EEDFCB",
                marginLeft: 4,
              }}
            >
              {item.dates}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Clock size={14} color="#EEDFCB" />
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Poppins_500Medium",
                color: "#EEDFCB",
                marginLeft: 4,
                marginRight: 12,
              }}
            >
              {item.duration}
            </Text>

            <DollarSign size={14} color="#EEDFCB" />
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Poppins_600SemiBold",
                color: "#EEDFCB",
                marginLeft: 2,
              }}
            >
              {item.budget}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Progress Bar */}
      {item.status !== "completed" && (
        <View style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Poppins_500Medium",
                color: isDark ? "#B7E4E3" : "#7ACFD6",
              }}
            >
              Planning Progress
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Poppins_600SemiBold",
                color: isDark ? "#FFF9F4" : "#0F2C4C",
              }}
            >
              {Math.round(item.progress * 100)}%
            </Text>
          </View>

          <View
            style={{
              width: "100%",
              height: 6,
              backgroundColor: isDark ? "#333333" : "#EEDFCB",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                width: `${item.progress * 100}%`,
                height: "100%",
                backgroundColor: "#7ACFD6",
                borderRadius: 3,
              }}
            />
          </View>
        </View>
      )}

      {item.status === "completed" && (
        <View style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Star size={16} color="#EEDFCB" fill="#EEDFCB" />
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins_500Medium",
                color: isDark ? "#B7E4E3" : "#7ACFD6",
                marginLeft: 6,
              }}
            >
              Trip completed • Rate your experience
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

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
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
      >
        {/* Header */}
        <View
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
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 28,
                fontFamily: "Poppins_600SemiBold",
                color: isDark ? "#FFF9F4" : "#0F2C4C",
              }}
            >
              My Itineraries
            </Text>
          </View>

          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins_400Regular",
              color: isDark ? "#B7E4E3" : "#7ACFD6",
              lineHeight: 24,
            }}
          >
            Plan, organize, and track your travel adventures
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Poppins_600SemiBold",
              color: isDark ? "#FFF9F4" : "#0F2C4C",
              marginBottom: 16,
            }}
          >
            Quick Actions
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleQuickAction(action.action)}
                style={{
                  width: 160,
                  padding: 20,
                  borderRadius: 20,
                  backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                  marginRight: 16,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: action.color,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <action.icon size={24} color="#FFF9F4" />
                </View>

                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Poppins_600SemiBold",
                    color: isDark ? "#FFF9F4" : "#0F2C4C",
                    marginBottom: 4,
                  }}
                >
                  {action.title}
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Poppins_400Regular",
                    color: isDark ? "#B7E4E3" : "#7ACFD6",
                    lineHeight: 16,
                  }}
                >
                  {action.subtitle}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Filter Tabs */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
          >
            {[
              { key: "all", label: "All Trips" },
              { key: "upcoming", label: "Upcoming" },
              { key: "planning", label: "Planning" },
              { key: "completed", label: "Completed" },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 18,
                  backgroundColor:
                    activeTab === tab.key
                      ? "#7ACFD6"
                      : isDark
                        ? "rgba(255, 249, 244, 0.1)"
                        : "rgba(255, 255, 255, 0.8)",
                  marginRight: 12,
                  borderWidth: 1,
                  borderColor:
                    activeTab === tab.key
                      ? "#7ACFD6"
                      : "rgba(122, 207, 214, 0.3)",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Poppins_500Medium",
                    color:
                      activeTab === tab.key
                        ? "#FFF9F4"
                        : isDark
                          ? "#B7E4E3"
                          : "#0F2C4C",
                  }}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Itineraries List */}
        <View
          style={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 100 }}
        >
          {filteredItineraries.length > 0 ? (
            filteredItineraries.map(renderItineraryCard)
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 60,
              }}
            >
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: isDark ? "#1F2937" : "#EEDFCB",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <MapPin size={32} color="#7ACFD6" />
              </View>

              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Poppins_600SemiBold",
                  color: isDark ? "#FFF9F4" : "#0F2C4C",
                  marginBottom: 8,
                  textAlign: "center",
                }}
              >
                No trips yet
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins_400Regular",
                  color: isDark ? "#B7E4E3" : "#7ACFD6",
                  textAlign: "center",
                  lineHeight: 24,
                  paddingHorizontal: 40,
                  marginBottom: 30,
                }}
              >
                Create your first itinerary and start planning your next
                adventure
              </Text>

              <TouchableOpacity
                onPress={() => router.push("/itinerary-input")}
                style={{
                  backgroundColor: "#0F2C4C",
                  borderRadius: 24,
                  paddingVertical: 16,
                  paddingHorizontal: 32,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Plus size={20} color="#FFF9F4" />
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Poppins_600SemiBold",
                    color: "#FFF9F4",
                    marginLeft: 8,
                  }}
                >
                  Plan New Trip
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
