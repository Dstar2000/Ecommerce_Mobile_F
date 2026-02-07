import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import OrdersScreen from "../screens/OrdersScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import Navbar from "../components/Navbar";

const Tab = createBottomTabNavigator();

export default function UserTabs() {
  return (
    <View style={styles.container}>
      {/* Navbar stays on top of all tabs */}
      <Navbar logo={require("../../assets/favicon.png")} />

      {/* Tabs take the rest of the screen */}
      <View style={styles.tabsContainer}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: "#00bcd4",
            tabBarInactiveTintColor: "#888",
            tabBarStyle: {
              height: 65,
              backgroundColor: "#fff",
              paddingBottom: 5,
              elevation: 5,
            },
            tabBarLabelStyle: { fontSize: 12, marginBottom: 5 },
            tabBarIcon: ({ color }) => {
              let iconName;
              switch (route.name) {
                case "Home":
                  iconName = "home";
                  break;
                case "Orders":
                  iconName = "shopping-cart";
                  break;
                case "Profile":
                  iconName = "person";
                  break;
                case "Settings":
                  iconName = "settings";
                  break;
              }
              return <MaterialIcons name={iconName} size={28} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Orders" component={OrdersScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabsContainer: { flex: 1 }, // important: make tabs fill remaining space below Navbar
});
