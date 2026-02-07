import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function OrdersScreen() {
  // Example orders (replace with API data)
  const orders = [
    {
      id: "ORD123456",
      date: "2026-02-07",
      status: "Delivered",
      total: 1200,
    },
    {
      id: "ORD123457",
      date: "2026-02-06",
      status: "Processing",
      total: 850,
    },
    {
      id: "ORD123458",
      date: "2026-02-05",
      status: "Cancelled",
      total: 500,
    },
  ];

  const renderOrder = ({ item }) => (
    <TouchableOpacity style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>{item.id}</Text>
        <Text
          style={[
            styles.orderStatus,
            item.status === "Delivered"
              ? styles.delivered
              : item.status === "Processing"
                ? styles.processing
                : styles.cancelled,
          ]}
        >
          {item.status}
        </Text>
      </View>
      <View style={styles.orderBody}>
        <Text style={styles.orderDate}>Date: {item.date}</Text>
        <Text style={styles.orderTotal}>Total: ₹{item.total}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <FlatList
        contentContainerStyle={styles.container}
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Text style={styles.title}>Your Orders</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00bcd4",
    marginBottom: 15,
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  orderId: { fontSize: 16, fontWeight: "bold", color: "#333" },
  orderStatus: { fontSize: 14, fontWeight: "bold" },
  delivered: { color: "green" },
  processing: { color: "#ff9800" },
  cancelled: { color: "red" },
  orderBody: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderDate: { fontSize: 14, color: "#555" },
  orderTotal: { fontSize: 14, color: "#555", fontWeight: "bold" },
});
