import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  useColorScheme,
  Animated,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  Shield,
  Phone,
  MapPin,
  Heart,
  AlertTriangle,
  Settings,
  Users,
  Navigation,
  Clock,
  PhoneCall,
  MessageSquare,
  Share2,
} from "lucide-react-native";

const emergencyContacts = [
  { name: "Police", number: "100", icon: Shield, color: "#DC2626" },
  { name: "Ambulance", number: "108", icon: Heart, color: "#EF4444" },
  {
    name: "Fire Brigade",
    number: "101",
    icon: AlertTriangle,
    color: "#F97316",
  },
  { name: "Tourist Helpline", number: "1363", icon: Phone, color: "#7ACFD6" },
];

const nearbyServices = [
  {
    name: "Police Station",
    distance: "2.3 km",
    address: "MG Road, Goa",
    type: "police",
  },
  {
    name: "General Hospital",
    distance: "1.8 km",
    address: "Hospital Road, Goa",
    type: "hospital",
  },
  {
    name: "Embassy",
    distance: "5.2 km",
    address: "Diplomatic Area, Goa",
    type: "embassy",
  },
  {
    name: "Tourist Center",
    distance: "800 m",
    address: "Beach Road, Goa",
    type: "info",
  },
];

export default function SOSScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [sosActive, setSOSActive] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [locationShared, setLocationShared] = useState(false);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const countdownRef = useRef(null);

  useEffect(() => {
    // Pulse animation for SOS button
    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };

    if (sosActive) {
      pulse();
    } else {
      pulseAnim.setValue(1);
    }
  }, [sosActive, pulseAnim]);

  const handleSOSPress = () => {
    if (sosActive) {
      // Cancel SOS
      setSOSActive(false);
      setCountdown(0);
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
      Alert.alert("SOS Cancelled", "Emergency alert has been cancelled.");
    } else {
      // Activate SOS with countdown
      Alert.alert(
        "Activate SOS?",
        "This will send your location to emergency contacts and local authorities after 10 seconds.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Activate",
            style: "destructive",
            onPress: () => startSOSCountdown(),
          },
        ],
      );
    }
  };

  const startSOSCountdown = () => {
    setSOSActive(true);
    setCountdown(10);

    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          triggerEmergencyAlert();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const triggerEmergencyAlert = () => {
    setLocationShared(true);
    Alert.alert(
      "Emergency Alert Sent!",
      "Your location and emergency alert have been sent to your contacts and local authorities.",
      [
        {
          text: "OK",
          onPress: () => {
            setSOSActive(false);
            setCountdown(0);
            setLocationShared(false);
          },
        },
      ],
    );
  };

  const handleEmergencyCall = (contact) => {
    Alert.alert(
      `Call ${contact.name}?`,
      `This will dial ${contact.number} immediately.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Call Now",
          style: "destructive",
          onPress: () => {
            Alert.alert("Calling...", `Dialing ${contact.number}`);
          },
        },
      ],
    );
  };

  const handleShareLocation = () => {
    Alert.alert(
      "Share Live Location",
      "Your current location will be shared with selected contacts for the next 60 minutes.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Share",
          onPress: () => {
            setLocationShared(true);
            Alert.alert(
              "Location Shared",
              "Your live location is now being shared.",
            );
          },
        },
      ],
    );
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
        {/* Header */}
        <LinearGradient
          colors={sosActive ? ["#DC2626", "#991B1B"] : ["#7ACFD6", "#0F2C4C"]}
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
              marginBottom: 16,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Shield size={28} color="#FFF9F4" />
              <Text
                style={{
                  fontSize: 28,
                  fontFamily: "Poppins_600SemiBold",
                  color: "#FFF9F4",
                  marginLeft: 12,
                }}
              >
                Safety Center
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => router.push("/safety-settings")}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "rgba(255, 249, 244, 0.2)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Settings size={20} color="#FFF9F4" />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins_400Regular",
              color: "#B7E4E3",
              lineHeight: 24,
            }}
          >
            {sosActive
              ? "Emergency mode active. Help is on the way."
              : "Your safety is our priority. Access emergency help instantly."}
          </Text>
        </LinearGradient>

        {/* SOS Status Card */}
        {sosActive && (
          <View
            style={{
              marginHorizontal: 20,
              marginTop: -15,
              padding: 20,
              borderRadius: 20,
              backgroundColor: "#DC2626",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <AlertTriangle size={20} color="#FFF9F4" />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins_600SemiBold",
                  color: "#FFF9F4",
                  marginLeft: 8,
                }}
              >
                Emergency Alert Active
              </Text>
            </View>

            {countdown > 0 ? (
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: "Poppins_600SemiBold",
                  color: "#FFF9F4",
                  textAlign: "center",
                  marginBottom: 8,
                }}
              >
                Sending in {countdown}s
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins_500Medium",
                  color: "#FFF9F4",
                  textAlign: "center",
                  marginBottom: 8,
                }}
              >
                Alert sent to emergency contacts
              </Text>
            )}

            {locationShared && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MapPin size={16} color="#B7E4E3" />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Poppins_400Regular",
                    color: "#B7E4E3",
                    marginLeft: 4,
                  }}
                >
                  Location shared with contacts
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Main SOS Button */}
        <View
          style={{
            alignItems: "center",
            paddingVertical: 40,
          }}
        >
          <Animated.View
            style={{
              transform: [{ scale: sosActive ? pulseAnim : 1 }],
            }}
          >
            <TouchableOpacity
              onPress={handleSOSPress}
              style={{
                width: 200,
                height: 200,
                borderRadius: 100,
                backgroundColor: sosActive ? "#DC2626" : "#7ACFD6",
                justifyContent: "center",
                alignItems: "center",
                shadowColor: sosActive ? "#DC2626" : "#7ACFD6",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.4,
                shadowRadius: 16,
                elevation: 12,
                borderWidth: 6,
                borderColor: sosActive ? "#991B1B" : "#0F2C4C",
              }}
            >
              <Shield size={60} color="#FFF9F4" />
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: "Poppins_600SemiBold",
                  color: "#FFF9F4",
                  marginTop: 8,
                }}
              >
                {sosActive ? "CANCEL" : "SOS"}
              </Text>

              {countdown > 0 && (
                <Text
                  style={{
                    fontSize: 32,
                    fontFamily: "Poppins_600SemiBold",
                    color: "#FFF9F4",
                    marginTop: 4,
                  }}
                >
                  {countdown}
                </Text>
              )}
            </TouchableOpacity>
          </Animated.View>

          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins_500Medium",
              color: isDark ? "#B7E4E3" : "#7ACFD6",
              textAlign: "center",
              marginTop: 20,
              paddingHorizontal: 40,
              lineHeight: 22,
            }}
          >
            {sosActive
              ? "Tap to cancel emergency alert"
              : "Hold to activate emergency mode"}
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

          <View style={{ flexDirection: "row", gap: 12, marginBottom: 12 }}>
            <TouchableOpacity
              onPress={handleShareLocation}
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                padding: 16,
                borderRadius: 16,
                backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <MapPin size={20} color="#7ACFD6" />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins_500Medium",
                  color: isDark ? "#FFF9F4" : "#0F2C4C",
                  marginLeft: 8,
                }}
              >
                Share Location
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                padding: 16,
                borderRadius: 16,
                backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <MessageSquare size={20} color="#7ACFD6" />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins_500Medium",
                  color: isDark ? "#FFF9F4" : "#0F2C4C",
                  marginLeft: 8,
                }}
              >
                Send Message
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Emergency Contacts */}
        <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Poppins_600SemiBold",
              color: isDark ? "#FFF9F4" : "#0F2C4C",
              marginBottom: 16,
            }}
          >
            Emergency Contacts
          </Text>

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            {emergencyContacts.map((contact, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleEmergencyCall(contact)}
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
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: contact.color,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <contact.icon size={24} color="#FFF9F4" />
                </View>

                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Poppins_600SemiBold",
                    color: isDark ? "#FFF9F4" : "#0F2C4C",
                    textAlign: "center",
                    marginBottom: 2,
                  }}
                >
                  {contact.name}
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Poppins_500Medium",
                    color: "#7ACFD6",
                    textAlign: "center",
                  }}
                >
                  {contact.number}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Nearby Services */}
        <View
          style={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 100 }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Poppins_600SemiBold",
              color: isDark ? "#FFF9F4" : "#0F2C4C",
              marginBottom: 16,
            }}
          >
            Nearby Emergency Services
          </Text>

          {nearbyServices.map((service, index) => (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 16,
                marginBottom: 12,
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
                <MapPin size={20} color="#FFF9F4" />
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
                  {service.name}
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Poppins_400Regular",
                    color: isDark ? "#B7E4E3" : "#7ACFD6",
                    marginBottom: 2,
                  }}
                >
                  {service.address}
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Poppins_500Medium",
                    color: "#7ACFD6",
                  }}
                >
                  {service.distance} away
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: isDark ? "#333333" : "#EEDFCB",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Navigation size={16} color="#7ACFD6" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
