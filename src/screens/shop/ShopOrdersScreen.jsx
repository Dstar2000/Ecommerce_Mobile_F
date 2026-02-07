import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ShopOrdersScreen() {
  // Dummy orders data
  const orders = [
    { id: "ORD001", customer: "Alice", amount: 1200, status: "Pending" },
    { id: "ORD002", customer: "Bob", amount: 3500, status: "Delivered" },
    { id: "ORD003", customer: "Charlie", amount: 500, status: "Cancelled" },
    { id: "ORD004", customer: "David", amount: 2400, status: "Pending" },
    { id: "ORD005", customer: "Eve", amount: 1800, status: "Delivered" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#ff9800";
      case "Delivered":
        return "#4caf50";
      case "Cancelled":
        return "#f44336";
      default:
        return "#888";
    }
  };

  const handleOrderPress = (orderId) => {
    alert(`Order ${orderId} clicked!`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Your Orders</Text>

      {orders.map((order) => (
        <TouchableOpacity
          key={order.id}
          style={styles.orderCard}
          onPress={() => handleOrderPress(order.id)}
        >
          <View style={styles.orderInfo}>
            <Text style={styles.orderId}>{order.id}</Text>
            <Text style={styles.customer}>{order.customer}</Text>
          </View>
          <View style={styles.orderDetails}>
            <Text style={styles.amount}>₹{order.amount}</Text>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(order.status) },
              ]}
            >
              <Text style={styles.statusText}>{order.status}</Text>
            </View>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={20} color="#888" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00bcd4",
    marginBottom: 20,
  },
  orderCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  orderInfo: {},
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  customer: {
    fontSize: 14,
    color: "#555",
    marginTop: 3,
  },
  orderDetails: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00bcd4",
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 5,
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});
