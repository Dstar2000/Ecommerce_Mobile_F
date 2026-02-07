import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const banners = [
    "https://images.unsplash.com/photo-1580910051073-3f1c9b2a8d7d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1609945317485-90c008f0c71f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1601597112247-1a1d0f6d5c6e?auto=format&fit=crop&w=800&q=80",
  ];

  const scrollRef = useRef();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Banner Carousel */}
      <View style={styles.carouselWrapper}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={scrollRef}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {banners.map((banner, index) => (
            <Image
              key={index}
              source={{ uri: banner }}
              style={styles.bannerImage}
            />
          ))}
        </ScrollView>
      </View>

      {/* Welcome Section */}
      <View style={styles.welcome}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.welcomeSubtitle}>
          Explore the latest deals and offers
        </Text>
      </View>

      {/* Example quick info section */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Your Orders</Text>
        <Text style={styles.infoSubtitle}>You have 3 pending orders</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Your Profile</Text>
        <Text style={styles.infoSubtitle}>Update your information</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    backgroundColor: "#f5f5f5",
  },
  carouselWrapper: {
    height: 180,
    marginBottom: 20,
  },
  bannerImage: {
    width: width - 40,
    height: 180,
    borderRadius: 12,
    marginRight: 15,
  },
  welcome: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00bcd4",
    marginBottom: 5,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: "#555",
  },
  infoCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12,
    padding: 15,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00bcd4",
  },
  infoSubtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
});
