import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Card, Text, Title, Button, Divider } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

export default function ShopHomeScreen() {
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

  const recentOrders = [
    { id: "ORD001", customer: "John Doe", status: "Pending" },
    { id: "ORD002", customer: "Jane Smith", status: "Delivered" },
    { id: "ORD003", customer: "Alice Brown", status: "Cancelled" },
  ];

  const handleAction = (action) => alert(`${action} clicked!`);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <Title style={styles.title}>Welcome, Shop Owner!</Title>
        <Text style={styles.subtitle}>Here’s your dashboard overview</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        {stats.map((stat, idx) => (
          <Card
            key={idx}
            style={[styles.statCard, { borderLeftColor: stat.color }]}
            onPress={() => handleAction(stat.label)}
          >
            <Card.Content style={styles.statCardContent}>
              <MaterialIcons name={stat.icon} size={32} color={stat.color} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <Button
          mode="contained"
          icon={() => (
            <MaterialIcons name="add-circle-outline" size={24} color="#fff" />
          )}
          onPress={() => handleAction("Add Product")}
          style={styles.actionButton}
          contentStyle={styles.actionButtonContent}
        >
          Add Product
        </Button>

        <Button
          mode="contained"
          icon={() => <MaterialIcons name="inventory" size={24} color="#fff" />}
          onPress={() => handleAction("Manage Inventory")}
          style={styles.actionButton}
          contentStyle={styles.actionButtonContent}
        >
          Manage Inventory
        </Button>
      </View>

      {/* Recent Orders Section */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Recent Orders</Title>
        {recentOrders.map((order, idx) => (
          <Card key={idx} style={styles.orderCard}>
            <Card.Content style={styles.orderCardContent}>
              <View style={{ flex: 1 }}>
                <Text style={styles.orderId}>{order.id}</Text>
                <Text style={styles.orderCustomer}>{order.customer}</Text>
              </View>
              <Text
                style={[
                  styles.orderStatus,
                  order.status === "Delivered"
                    ? { color: "#4caf50" }
                    : order.status === "Pending"
                      ? { color: "#ff9800" }
                      : { color: "#f44336" },
                ]}
              >
                {order.status}
              </Text>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* Inventory Overview */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Inventory Overview</Title>
        <Card style={styles.inventoryCard}>
          <Card.Content
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Total Products</Text>
            <Text>350</Text>
          </Card.Content>
          <Divider />
          <Card.Content
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Out of Stock</Text>
            <Text>12</Text>
          </Card.Content>
          <Divider />
          <Card.Content
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Low Stock</Text>
            <Text>20</Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f3f7",
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    marginVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00bcd4",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    width: "48%",
    marginBottom: 12,
    borderLeftWidth: 5,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#fff",
  },
  statCardContent: {
    alignItems: "center",
    paddingVertical: 16,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 8,
    color: "#333",
  },
  statLabel: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
    textAlign: "center",
  },
  actionsContainer: {
    marginTop: 25,
  },
  actionButton: {
    marginBottom: 12,
    borderRadius: 12,
  },
  actionButtonContent: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    paddingVertical: 12,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  orderCard: {
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  orderCardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  orderId: {
    fontWeight: "bold",
  },
  orderCustomer: {
    color: "#555",
    marginTop: 2,
  },
  orderStatus: {
    fontWeight: "bold",
  },
  inventoryCard: {
    borderRadius: 12,
    elevation: 2,
    marginBottom: 20,
  },
});
