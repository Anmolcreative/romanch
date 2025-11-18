import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  useColorScheme,
  Animated,
} from "react-native";
import { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
  Search,
  Filter,
  Heart,
  Share,
  Bookmark,
  MapPin,
  Star,
  DollarSign,
  Clock,
} from "lucide-react-native";

const mockDestinations = [
  {
    id: 1,
    name: "Goa Beaches",
    location: "Goa, India",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=600&fit=crop",
    tags: ["Beach", "Solo", "Photography"],
    rating: 4.8,
    budget: "₹15,000",
    duration: "3-4 days",
    saved: false,
  },
  {
    id: 2,
    name: "Manali Adventures",
    location: "Himachal Pradesh, India",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop",
    tags: ["Adventure", "Nature", "Culture"],
    rating: 4.6,
    budget: "₹20,000",
    duration: "5-6 days",
    saved: true,
  },
  {
    id: 3,
    name: "Kerala Backwaters",
    location: "Kerala, India",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=700&fit=crop",
    tags: ["Nature", "Culture", "Food"],
    rating: 4.9,
    budget: "₹18,000",
    duration: "4-5 days",
    saved: false,
  },
  {
    id: 4,
    name: "Rajasthan Palaces",
    location: "Rajasthan, India",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=550&fit=crop",
    tags: ["Culture", "Photography", "Architecture"],
    rating: 4.7,
    budget: "₹25,000",
    duration: "6-7 days",
    saved: true,
  },
  {
    id: 5,
    name: "Hampi Ruins",
    location: "Karnataka, India",
    image:
      "https://images.unsplash.com/photo-1545146344-0ad958bd96b4?w=400&h=600&fit=crop",
    tags: ["Culture", "History", "Solo"],
    rating: 4.5,
    budget: "₹12,000",
    duration: "2-3 days",
    saved: false,
  },
  {
    id: 6,
    name: "Ladakh Landscapes",
    location: "Ladakh, India",
    image:
      "https://images.unsplash.com/photo-1506664999203-9e84c8d1fea8?w=400&h=650&fit=crop",
    tags: ["Adventure", "Nature", "Photography"],
    rating: 4.9,
    budget: "₹35,000",
    duration: "7-10 days",
    saved: false,
  },
];

const filters = [
  "All",
  "Budget",
  "Adventure",
  "Culture",
  "Food",
  "Nature",
  "Solo",
];

export default function ExploreScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const scrollY = useRef(new Animated.Value(0)).current;

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [savedItems, setSavedItems] = useState(new Set([2, 4]));

  const toggleSaved = (id) => {
    setSavedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredDestinations = mockDestinations.filter((dest) => {
    if (activeFilter === "All") return true;
    return dest.tags.some(
      (tag) => tag.toLowerCase() === activeFilter.toLowerCase(),
    );
  });

  const getItemHeight = (index) => {
    const heights = [280, 320, 360, 300, 280, 340];
    return heights[index % heights.length];
  };

  const renderDestinationCard = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => router.push(`/destination/${item.id}`)}
      style={{
        width: "48%",
        marginBottom: 16,
        borderRadius: 24,
        backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      }}
    >
      <View style={{ position: "relative" }}>
        <Image
          source={{ uri: item.image }}
          style={{
            width: "100%",
            height: getItemHeight(index),
            borderRadius: 24,
          }}
          contentFit="cover"
        />

        {/* Gradient Overlay */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 120,
            borderRadius: 24,
            justifyContent: "flex-end",
            padding: 16,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins_600SemiBold",
              color: "#FFF9F4",
              marginBottom: 4,
            }}
          >
            {item.name}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <MapPin size={12} color="#B7E4E3" />
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Poppins_400Regular",
                color: "#B7E4E3",
                marginLeft: 4,
              }}
            >
              {item.location}
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
              <Star size={12} color="#EEDFCB" fill="#EEDFCB" />
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: "Poppins_500Medium",
                  color: "#EEDFCB",
                  marginLeft: 4,
                  marginRight: 8,
                }}
              >
                {item.rating}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: "Poppins_500Medium",
                  color: "#B7E4E3",
                }}
              >
                {item.budget}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Action Buttons */}
        <View
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            flexDirection: "column",
            gap: 8,
          }}
        >
          <TouchableOpacity
            onPress={() => toggleSaved(item.id)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: "rgba(255, 249, 244, 0.9)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Bookmark
              size={18}
              color={savedItems.has(item.id) ? "#7ACFD6" : "#0F2C4C"}
              fill={savedItems.has(item.id) ? "#7ACFD6" : "transparent"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: "rgba(255, 249, 244, 0.9)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Share size={16} color="#0F2C4C" />
          </TouchableOpacity>
        </View>

        {/* Tags */}
        <View
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 6,
          }}
        >
          {item.tags.slice(0, 2).map((tag, index) => (
            <View
              key={index}
              style={{
                backgroundColor: "rgba(122, 207, 214, 0.9)",
                borderRadius: 12,
                paddingHorizontal: 8,
                paddingVertical: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: "Poppins_500Medium",
                  color: "#FFF9F4",
                }}
              >
                {tag}
              </Text>
            </View>
          ))}
        </View>
      </View>
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

      {/* Fixed Header */}
      <Animated.View
        style={{
          paddingTop: insets.top + 16,
          paddingBottom: 16,
          paddingHorizontal: 20,
          backgroundColor: isDark ? "#121212" : "#FFF9F4",
          borderBottomWidth: scrollY.interpolate({
            inputRange: [0, 50],
            outputRange: [0, 1],
            extrapolate: "clamp",
          }),
          borderBottomColor: isDark ? "#333333" : "rgba(122, 207, 214, 0.3)",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
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
                fontSize: 28,
                fontFamily: "Poppins_600SemiBold",
                color: isDark ? "#FFF9F4" : "#0F2C4C",
              }}
            >
              ROM
            </Text>
            <Text
              style={{
                fontSize: 28,
                fontFamily: "NotoSansDevanagari_600SemiBold",
                color: isDark ? "#FFF9F4" : "#0F2C4C",
              }}
            >
              ांच
            </Text>
          </View>

          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins_400Regular",
              color: isDark ? "#B7E4E3" : "#7ACFD6",
              marginLeft: 8,
            }}
          >
            Explore
          </Text>
        </View>

        {/* Search Bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: isDark
              ? "rgba(255, 249, 244, 0.1)"
              : "rgba(255, 255, 255, 0.8)",
            borderRadius: 20,
            paddingHorizontal: 16,
            paddingVertical: 12,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: "rgba(122, 207, 214, 0.3)",
          }}
        >
          <Search size={20} color={isDark ? "#B7E4E3" : "#7ACFD6"} />
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              fontFamily: "Poppins_400Regular",
              color: isDark ? "#B7E4E3" : "#7ACFD6",
              marginLeft: 12,
            }}
          >
            Search destinations...
          </Text>
          <TouchableOpacity>
            <Filter size={20} color={isDark ? "#B7E4E3" : "#7ACFD6"} />
          </TouchableOpacity>
        </View>

        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {filters.map((filter, index) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 16,
                backgroundColor:
                  activeFilter === filter
                    ? "#7ACFD6"
                    : isDark
                      ? "rgba(255, 249, 244, 0.1)"
                      : "rgba(255, 255, 255, 0.8)",
                marginRight: 12,
                borderWidth: 1,
                borderColor:
                  activeFilter === filter
                    ? "#7ACFD6"
                    : "rgba(122, 207, 214, 0.3)",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins_500Medium",
                  color:
                    activeFilter === filter
                      ? "#FFF9F4"
                      : isDark
                        ? "#B7E4E3"
                        : "#0F2C4C",
                }}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Content */}
      <Animated.FlatList
        data={filteredDestinations}
        renderItem={renderDestinationCard}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: insets.bottom + 100,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
      />
    </View>
  );
}
