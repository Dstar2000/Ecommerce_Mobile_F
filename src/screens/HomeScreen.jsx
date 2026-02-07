// screens/HomeScreen.jsx
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Navbar from "../components/Navbar";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Welcome Home!</Text>
        <Text style={styles.subtitle}>This is your dashboard.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00bcd4",
    marginBottom: 10,
  },
  subtitle: { fontSize: 16, color: "#555", textAlign: "center" },
});
