import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import Navbar from "../components/Navbar";

import HomeScreen from "../screens/customer/HomeScreen";
import OrdersScreen from "../screens/customer/OrdersScreen";
import ProfileScreen from "../screens/customer/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function CustomerTabs() {
  return (
    <View style={styles.container}>
      {/* Navbar stays on top */}
      <Navbar logo={require("../../assets/favicon.png")} title="Customer App" />

      {/* Tabs below Navbar */}
      <View style={styles.tabsContainer}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: "#00bcd4",
            tabBarInactiveTintColor: "#888",
            tabBarStyle: {
              height: 65,
              paddingBottom: 5,
              backgroundColor: "#fff",
              elevation: 5,
            },
            tabBarLabelStyle: { fontSize: 12, marginBottom: 5 },
            tabBarIcon: ({ color, size }) => {
              let icon;
              if (route.name === "Home") icon = "home";
              if (route.name === "Orders") icon = "shopping-cart";
              if (route.name === "Profile") icon = "person";
              return <MaterialIcons name={icon} size={28} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Orders" component={OrdersScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabsContainer: { flex: 1 },
});
