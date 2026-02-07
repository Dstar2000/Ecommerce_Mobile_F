import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function Navbar({ title, onBackPress, logo }) {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          navigation.replace("Login");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Back Button or Logo */}
        {onBackPress ? (
          <TouchableOpacity style={styles.left} onPress={onBackPress}>
            <MaterialIcons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
        ) : logo ? (
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        ) : (
          <View style={styles.left} /> // placeholder
        )}

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Logout Icon */}
        <TouchableOpacity style={styles.right} onPress={handleLogout}>
          <MaterialIcons name="logout" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: "#0df3f7" },
  container: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  left: { width: 40 },
  right: { width: 40, alignItems: "flex-end" },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  logo: { width: 80, height: 50 },
});
