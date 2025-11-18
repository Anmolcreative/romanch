export async function POST(request) {
  try {
    const body = await request.json();
    const {
      destination,
      startDate,
      endDate,
      budget,
      travelVibes,
      safetyLevel,
      additionalNotes,
    } = body;

    // Mock itinerary generation
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate AI processing time

    const mockItinerary = {
      id: Date.now(),
      title: `${destination} Adventure`,
      destination,
      startDate,
      endDate,
      budget,
      travelVibes,
      safetyLevel,
      totalEstimatedCost: budget,
      days: [
        {
          day: "Day 1",
          date: startDate,
          activities: [
            {
              name: "Airport Arrival & Check-in",
              time: "10:00 AM",
              location: `${destination} Airport`,
              details:
                "Land at the airport and check into your accommodation. Take some time to rest and freshen up.",
              tips: "Keep your documents handy and exchange currency if needed",
              cost: "₹2,000",
              type: "travel",
            },
            {
              name: "Local Market Exploration",
              time: "3:00 PM",
              location: `${destination} Main Market`,
              details:
                "Explore the vibrant local markets and get a feel for the destination. Perfect for photography enthusiasts!",
              tips: "Try local street food and bargain for souvenirs",
              cost: "₹1,500",
              type: "culture",
            },
            {
              name: "Sunset Point Visit",
              time: "6:00 PM",
              location: "Scenic Sunset Point",
              details:
                "Watch the beautiful sunset from the best vantage point in the city. Great for solo travelers and photographers.",
              tips: "Arrive 30 minutes early to get the best spot",
              cost: "₹500",
              type: "nature",
            },
          ],
        },
        {
          day: "Day 2",
          date: "Next day",
          activities: [
            {
              name: "Adventure Activity",
              time: "9:00 AM",
              location: "Adventure Sports Center",
              details:
                "Experience thrilling adventure activities based on your preferences. Safety equipment provided.",
              tips: "Wear comfortable clothes and follow safety instructions",
              cost: "₹3,000",
              type: "adventure",
            },
            {
              name: "Cultural Heritage Tour",
              time: "2:00 PM",
              location: "Historical Sites",
              details:
                "Visit ancient temples, palaces, and heritage sites to understand local culture and history.",
              tips: "Hire a local guide for better insights",
              cost: "₹1,800",
              type: "culture",
            },
            {
              name: "Local Cuisine Experience",
              time: "7:00 PM",
              location: "Traditional Restaurant",
              details:
                "Enjoy authentic local cuisine at a highly recommended restaurant. Perfect for food lovers!",
              tips: "Try the chef's special and ask about ingredients if you have allergies",
              cost: "₹2,200",
              type: "food",
            },
          ],
        },
        {
          day: "Day 3",
          date: "Final day",
          activities: [
            {
              name: "Nature Walk & Photography",
              time: "8:00 AM",
              location: "Natural Park/Beach",
              details:
                "Early morning nature walk perfect for photography and peaceful moments. Ideal for solo travelers.",
              tips: "Bring a camera and enjoy the tranquility",
              cost: "₹800",
              type: "nature",
            },
            {
              name: "Souvenir Shopping",
              time: "11:00 AM",
              location: "Local Craft Markets",
              details:
                "Last-minute shopping for souvenirs and local crafts to remember your amazing trip.",
              tips: "Look for authentic local products",
              cost: "₹2,000",
              type: "culture",
            },
            {
              name: "Departure",
              time: "3:00 PM",
              location: `${destination} Airport`,
              details:
                "Check out and head to the airport for departure. Safe travels!",
              tips: "Reach airport 2 hours before domestic flights",
              cost: "₹1,200",
              type: "travel",
            },
          ],
        },
      ],
      safetyTips: [
        "Always carry a copy of your ID and important documents",
        "Share your itinerary with family/friends",
        "Keep emergency contacts handy",
        "Be aware of local customs and dress codes",
        "Use registered taxis or ride-sharing apps",
      ],
      emergencyContacts: [
        { name: "Local Police", number: "100" },
        { name: "Tourist Helpline", number: "1363" },
        { name: "Medical Emergency", number: "108" },
      ],
      bestTimeToVisit: "The weather is perfect this time of year!",
      packingList: [
        "Comfortable walking shoes",
        "Light cotton clothes",
        "Sunscreen and sunglasses",
        "Portable charger",
        "First aid kit",
        "Camera",
        "Local currency",
      ],
    };

    return Response.json({
      success: true,
      itinerary: mockItinerary,
    });
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return Response.json(
      { success: false, error: "Failed to generate itinerary" },
      { status: 500 },
    );
  }
}
