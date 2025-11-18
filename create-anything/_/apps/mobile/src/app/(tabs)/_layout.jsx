import { Tabs } from "expo-router";
import { useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Compass, Route, Shield, Users, User } from "lucide-react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? "#1F2937" : "#FFF9F4",
          borderTopWidth: 1,
          borderTopColor: isDark ? "#0F2C4C" : "rgba(122, 207, 214, 0.3)",
          paddingTop: 8,
          paddingBottom: insets.bottom + 8,
          height: insets.bottom + 70,
        },
        tabBarActiveTintColor: "#7ACFD6",
        tabBarInactiveTintColor: isDark ? "#B7E4E3" : "#0F2C4C",
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Poppins_500Medium",
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: -4,
        },
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => <Compass color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="itinerary"
        options={{
          title: "Itinerary",
          tabBarIcon: ({ color, size }) => <Route color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="sos"
        options={{
          title: "SOS",
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor:
                  color === "#7ACFD6" ? "#7ACFD6" : "transparent",
                borderWidth: 2,
                borderColor: color,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Shield
                color={color === "#7ACFD6" ? "#FFF9F4" : color}
                size={16}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
          tabBarIcon: ({ color, size }) => <Users color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
