import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import ShopHomeScreen from "../screens/shop/ShopHomeScreen";
import ShopOrdersScreen from "../screens/shop/ShopOrdersScreen";
import ShopProfileScreen from "../screens/shop/ShopProfileScreen";
import Navbar from "../components/Navbar";

const Tab = createBottomTabNavigator();

export default function ShopOwnerTabs() {
  return (
    <View style={styles.container}>
      {/* Navbar at the top */}
      <Navbar
        title="Shop Dashboard"
        logo={require("../../assets/favicon.png")}
      />

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
              elevation: 5,
              backgroundColor: "#fff",
            },
            tabBarLabelStyle: { fontSize: 12, marginBottom: 5 },
            tabBarIcon: ({ color, size }) => {
              let iconName;
              switch (route.name) {
                case "ShopHome":
                  iconName = "home";
                  break;
                case "ShopOrders":
                  iconName = "shopping-cart";
                  break;
                case "ShopProfile":
                  iconName = "person";
                  break;
              }
              return <MaterialIcons name={iconName} size={28} color={color} />;
            },
          })}
        >
          <Tab.Screen name="ShopHome" component={ShopHomeScreen} />
          <Tab.Screen name="ShopOrders" component={ShopOrdersScreen} />
          <Tab.Screen name="ShopProfile" component={ShopProfileScreen} />
        </Tab.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    flex: 1, // makes tabs fill remaining space below Navbar
  },
});
