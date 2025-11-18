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
  Users,
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  Plus,
  Camera,
  UserPlus,
  Filter,
  Search,
  Compass,
  Star,
} from "lucide-react-native";

const nearbyTravelers = [
  {
    id: 1,
    name: "Priya Sharma",
    age: 24,
    distance: "0.5 km",
    location: "Goa Beach",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616c79e6bae?w=80&h=80&fit=crop&crop=face",
    vibes: ["Solo", "Photography", "Beach"],
    isOnline: true,
    mutualConnections: 3,
  },
  {
    id: 2,
    name: "Arjun Patel",
    age: 28,
    distance: "1.2 km",
    location: "Old Goa",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    vibes: ["Culture", "History", "Food"],
    isOnline: false,
    mutualConnections: 1,
  },
  {
    id: 3,
    name: "Sarah Johnson",
    age: 26,
    distance: "2.1 km",
    location: "Anjuna Market",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    vibes: ["Adventure", "Nightlife", "Music"],
    isOnline: true,
    mutualConnections: 2,
  },
];

const feedPosts = [
  {
    id: 1,
    user: {
      name: "Maya Singh",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
      location: "Udaipur, Rajasthan",
    },
    content: {
      type: "image",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      caption:
        "Golden hour at the City Palace! This place never fails to amaze me 🏰✨",
    },
    engagement: {
      likes: 142,
      comments: 23,
      shares: 8,
      liked: false,
    },
    hashtags: ["#udaipur", "#rajasthan", "#palace", "#goldenhour"],
    timestamp: "2h ago",
  },
  {
    id: 2,
    user: {
      name: "Rohit Kumar",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      location: "Rishikesh, Uttarakhand",
    },
    content: {
      type: "image",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      caption:
        "Morning meditation by the Ganges. The peace here is indescribable 🧘‍♂️🙏",
    },
    engagement: {
      likes: 89,
      comments: 15,
      shares: 4,
      liked: true,
    },
    hashtags: ["#rishikesh", "#meditation", "#ganges", "#peace"],
    timestamp: "4h ago",
  },
  {
    id: 3,
    user: {
      name: "Lisa Chen",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face",
      location: "Hampi, Karnataka",
    },
    content: {
      type: "image",
      image:
        "https://images.unsplash.com/photo-1545146344-0ad958bd96b4?w=400&h=300&fit=crop",
      caption:
        "Exploring ancient ruins and feeling connected to history. Hampi is pure magic! 🏛️",
    },
    engagement: {
      likes: 256,
      comments: 42,
      shares: 18,
    },
    hashtags: ["#hampi", "#ruins", "#history", "#backpacker"],
    timestamp: "1d ago",
  },
];

export default function CommunityScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const scrollY = useRef(new Animated.Value(0)).current;

  const [activeTab, setActiveTab] = useState("feed");
  const [likedPosts, setLikedPosts] = useState(new Set([2]));

  const toggleLike = (postId) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleConnect = (userId) => {
    // Mock connect functionality
    console.log("Connecting with user:", userId);
  };

  const handleChat = (userId) => {
    router.push(`/chat/${userId}`);
  };

  const renderTravelerCard = ({ item }) => (
    <TouchableOpacity
      style={{
        width: 160,
        padding: 16,
        marginRight: 12,
        borderRadius: 20,
        backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      }}
    >
      <View
        style={{ position: "relative", alignItems: "center", marginBottom: 12 }}
      >
        <Image
          source={{ uri: item.avatar }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            borderWidth: 3,
            borderColor: item.isOnline ? "#7ACFD6" : "transparent",
          }}
          contentFit="cover"
        />

        {item.isOnline && (
          <View
            style={{
              position: "absolute",
              bottom: 2,
              right: 2,
              width: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: "#22C55E",
              borderWidth: 2,
              borderColor: isDark ? "#1F2937" : "#FFFFFF",
            }}
          />
        )}
      </View>

      <Text
        style={{
          fontSize: 16,
          fontFamily: "Poppins_600SemiBold",
          color: isDark ? "#FFF9F4" : "#0F2C4C",
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        {item.name}
      </Text>

      <Text
        style={{
          fontSize: 12,
          fontFamily: "Poppins_400Regular",
          color: isDark ? "#B7E4E3" : "#7ACFD6",
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        {item.age} • {item.distance} away
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 12,
        }}
      >
        <MapPin size={12} color={isDark ? "#B7E4E3" : "#7ACFD6"} />
        <Text
          style={{
            fontSize: 11,
            fontFamily: "Poppins_400Regular",
            color: isDark ? "#B7E4E3" : "#7ACFD6",
            marginLeft: 4,
          }}
        >
          {item.location}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
          marginBottom: 16,
        }}
      >
        {item.vibes.slice(0, 2).map((vibe, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "#7ACFD6",
              borderRadius: 10,
              paddingHorizontal: 6,
              paddingVertical: 2,
            }}
          >
            <Text
              style={{
                fontSize: 9,
                fontFamily: "Poppins_500Medium",
                color: "#FFF9F4",
              }}
            >
              {vibe}
            </Text>
          </View>
        ))}
      </View>

      <View style={{ flexDirection: "row", gap: 8 }}>
        <TouchableOpacity
          onPress={() => handleConnect(item.id)}
          style={{
            flex: 1,
            backgroundColor: "#0F2C4C",
            borderRadius: 12,
            paddingVertical: 8,
            alignItems: "center",
          }}
        >
          <UserPlus size={14} color="#FFF9F4" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleChat(item.id)}
          style={{
            flex: 1,
            backgroundColor: isDark ? "#333333" : "#EEDFCB",
            borderRadius: 12,
            paddingVertical: 8,
            alignItems: "center",
          }}
        >
          <MessageCircle size={14} color="#7ACFD6" />
        </TouchableOpacity>
      </View>

      {item.mutualConnections > 0 && (
        <Text
          style={{
            fontSize: 10,
            fontFamily: "Poppins_400Regular",
            color: "#7ACFD6",
            textAlign: "center",
            marginTop: 8,
          }}
        >
          {item.mutualConnections} mutual connection
          {item.mutualConnections > 1 ? "s" : ""}
        </Text>
      )}
    </TouchableOpacity>
  );

  const renderFeedPost = ({ item }) => (
    <View
      style={{
        backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
        borderRadius: 20,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      }}
    >
      {/* Post Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
          paddingBottom: 12,
        }}
      >
        <Image
          source={{ uri: item.user.avatar }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            marginRight: 12,
          }}
          contentFit="cover"
        />

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins_600SemiBold",
              color: isDark ? "#FFF9F4" : "#0F2C4C",
              marginBottom: 2,
            }}
          >
            {item.user.name}
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MapPin size={12} color={isDark ? "#B7E4E3" : "#7ACFD6"} />
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Poppins_400Regular",
                color: isDark ? "#B7E4E3" : "#7ACFD6",
                marginLeft: 4,
                marginRight: 8,
              }}
            >
              {item.user.location}
            </Text>

            <Text
              style={{
                fontSize: 12,
                fontFamily: "Poppins_400Regular",
                color: isDark ? "#B7E4E3" : "#7ACFD6",
              }}
            >
              • {item.timestamp}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: isDark ? "#333333" : "#F3F4F6",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Share2 size={16} color={isDark ? "#B7E4E3" : "#7ACFD6"} />
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <Image
        source={{ uri: item.content.image }}
        style={{
          width: "100%",
          height: 250,
        }}
        contentFit="cover"
      />

      {/* Post Actions */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <TouchableOpacity
            onPress={() => toggleLike(item.id)}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Heart
              size={24}
              color={
                likedPosts.has(item.id)
                  ? "#EF4444"
                  : isDark
                    ? "#B7E4E3"
                    : "#7ACFD6"
              }
              fill={likedPosts.has(item.id) ? "#EF4444" : "transparent"}
            />
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins_500Medium",
                color: isDark ? "#B7E4E3" : "#7ACFD6",
                marginLeft: 6,
              }}
            >
              {item.engagement.likes + (likedPosts.has(item.id) ? 1 : 0)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <MessageCircle size={22} color={isDark ? "#B7E4E3" : "#7ACFD6"} />
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins_500Medium",
                color: isDark ? "#B7E4E3" : "#7ACFD6",
                marginLeft: 6,
              }}
            >
              {item.engagement.comments}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Share2 size={20} color={isDark ? "#B7E4E3" : "#7ACFD6"} />
        </TouchableOpacity>
      </View>

      {/* Post Caption */}
      <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Poppins_400Regular",
            color: isDark ? "#FFF9F4" : "#0F2C4C",
            lineHeight: 20,
            marginBottom: 8,
          }}
        >
          {item.content.caption}
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          {item.hashtags.map((tag, index) => (
            <Text
              key={index}
              style={{
                fontSize: 12,
                fontFamily: "Poppins_500Medium",
                color: "#7ACFD6",
              }}
            >
              {tag}
            </Text>
          ))}
        </View>
      </View>
    </View>
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
      <View
        style={{
          paddingTop: insets.top + 16,
          paddingBottom: 16,
          paddingHorizontal: 20,
          backgroundColor: isDark ? "#121212" : "#FFF9F4",
          borderBottomWidth: 1,
          borderBottomColor: isDark ? "#333333" : "rgba(122, 207, 214, 0.3)",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Users size={28} color={isDark ? "#FFF9F4" : "#0F2C4C"} />
            <Text
              style={{
                fontSize: 28,
                fontFamily: "Poppins_600SemiBold",
                color: isDark ? "#FFF9F4" : "#0F2C4C",
                marginLeft: 12,
              }}
            >
              Community
            </Text>
          </View>

          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#7ACFD6",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Plus size={20} color="#FFF9F4" />
          </TouchableOpacity>
        </View>

        {/* Tab Navigation */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: isDark
              ? "rgba(255, 249, 244, 0.1)"
              : "rgba(255, 255, 255, 0.8)",
            borderRadius: 20,
            padding: 4,
          }}
        >
          {[
            { key: "feed", label: "Feed" },
            { key: "nearby", label: "Near Me" },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={{
                flex: 1,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 16,
                backgroundColor:
                  activeTab === tab.key ? "#7ACFD6" : "transparent",
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
                  textAlign: "center",
                }}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Content */}
      {activeTab === "nearby" ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingVertical: 20,
            paddingBottom: insets.bottom + 100,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Poppins_600SemiBold",
                color: isDark ? "#FFF9F4" : "#0F2C4C",
                marginBottom: 8,
              }}
            >
              Travelers Near You
            </Text>

            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins_400Regular",
                color: isDark ? "#B7E4E3" : "#7ACFD6",
                marginBottom: 16,
              }}
            >
              Connect with fellow adventurers in your area
            </Text>
          </View>

          <FlatList
            data={nearbyTravelers}
            renderItem={renderTravelerCard}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 20,
            }}
          />
        </ScrollView>
      ) : (
        <FlatList
          data={feedPosts}
          renderItem={renderFeedPost}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: insets.bottom + 100,
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
