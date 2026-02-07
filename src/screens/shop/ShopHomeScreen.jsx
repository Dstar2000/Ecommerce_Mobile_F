import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ShopHomeScreen() {
  // Dummy shop stats
  const stats = [
    {
      label: "Total Orders",
      value: 120,
      icon: "shopping-cart",
      color: "#00bcd4",
    },
    { label: "Pending Orders", value: 15, icon: "pending", color: "#ff9800" },
    { label: "Delivered", value: 100, icon: "check-circle", color: "#4caf50" },
    { label: "Cancelled", value: 5, icon: "cancel", color: "#f44336" },
  ];

  const handleAction = (action) => {
    alert(`${action} clicked!`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome, Shop Owner!</Text>
        <Text style={styles.subtitle}>Here’s your dashboard overview</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        {stats.map((stat, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.statCard, { borderLeftColor: stat.color }]}
            onPress={() => handleAction(stat.label)}
          >
            <MaterialIcons name={stat.icon} size={28} color={stat.color} />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleAction("Add New Product")}
        >
          <MaterialIcons name="add-circle-outline" size={24} color="#00bcd4" />
          <Text style={styles.actionText}>Add Product</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleAction("Manage Inventory")}
        >
          <MaterialIcons name="inventory" size={24} color="#00bcd4" />
          <Text style={styles.actionText}>Manage Inventory</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    marginBottom: 25,
  },
  welcome: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00bcd4",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 5,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  statLabel: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
    textAlign: "center",
  },
  actionsContainer: {
    marginTop: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  actionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00bcd4",
    marginLeft: 10,
  },
});
