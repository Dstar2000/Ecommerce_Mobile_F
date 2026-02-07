// screens/UsersScreen.jsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function UsersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users Screen</Text>
      <Text style={styles.subtitle}>Manage your app users here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 28, fontWeight: "bold", color: "#00bcd4" },
  subtitle: { fontSize: 16, color: "#555", marginTop: 10, textAlign: "center" },
});
