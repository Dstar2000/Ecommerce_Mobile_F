import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { login } from "../services/auth.service";

export default function LoginScreen({ navigation }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Animated values for floating labels
  const animatedValues = {
    email: useRef(new Animated.Value(0)).current,
    password: useRef(new Animated.Value(0)).current,
  };

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    if (errors[key]) setErrors({ ...errors, [key]: null });
  };

  const handleFocus = (key) => {
    Animated.timing(animatedValues[key], {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = (key) => {
    if (!form[key]) {
      Animated.timing(animatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Invalid email format";

    if (!form.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await login(form);
      const { accessToken, user } = res.data.data;

      if (!accessToken) {
        Alert.alert("Login Failed", "Token missing from server");
        return;
      }

      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("userRole", user.role);

      // Navigate based on role
      if (user.role === "customer") {
        navigation.replace("CustomerTabs");
      } else if (user.role === "shopOwner") {
        navigation.replace("ShopOwnerTabs");
      } else {
        Alert.alert("Login Failed", "Invalid user role");
      }
    } catch (err) {
      console.log("LOGIN ERROR 👉", err.response?.data || err.message);
      Alert.alert(
        "Login Failed",
        err.response?.data?.message || "Server error",
      );
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (key, label, secure = false, keyboard = "default") => {
    const hasError = errors[key];
    const labelStyle = {
      position: "absolute",
      left: 0,
      top: animatedValues[key].interpolate({
        inputRange: [0, 1],
        outputRange: [14, -10],
      }),
      fontSize: animatedValues[key].interpolate({
        inputRange: [0, 1],
        outputRange: [16, 12],
      }),
      color: animatedValues[key].interpolate({
        inputRange: [0, 1],
        outputRange: ["#888", "#00bcd4"],
      }),
    };

    return (
      <View style={{ marginBottom: 25 }}>
        <Animated.Text style={labelStyle}>
          {label} <Text style={{ color: "red" }}>*</Text>
        </Animated.Text>
        <TextInput
          style={styles.input}
          value={form[key]}
          onChangeText={(val) => handleChange(key, val)}
          onFocus={() => handleFocus(key)}
          onBlur={() => handleBlur(key)}
          secureTextEntry={secure && !showPassword}
          keyboardType={keyboard}
        />
        <View
          style={[
            styles.underline,
            { backgroundColor: hasError ? "red" : "#00bcd4" },
          ]}
        />
        {hasError && <Text style={styles.error}>{hasError}</Text>}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      {renderInput("email", "Email", false, "email-address")}
      {renderInput("password", "Password", true)}

      <TouchableOpacity
        style={styles.showPasswordBtn}
        onPress={() => setShowPassword(!showPassword)}
      >
        <MaterialIcons
          name={showPassword ? "visibility" : "visibility-off"}
          size={24}
          color="#888"
        />
        <Text style={{ marginLeft: 8 }}>{showPassword ? "Hide" : "Show"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.signupText}>
        Don't have an account?{" "}
        <Text
          style={styles.signupLink}
          onPress={() => navigation.navigate("SignUp")}
        >
          Sign Up
        </Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 30,
    paddingTop: 80,
    paddingBottom: 40,
    backgroundColor: "#f5f5f5",
  },
  title: { fontSize: 36, fontWeight: "bold", color: "#333", marginBottom: 5 },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 40 },
  input: {
    height: 50,
    fontSize: 16,
    color: "#000",
    paddingTop: 14,
    paddingHorizontal: 0,
  },
  underline: { height: 1.5, width: "100%", marginTop: 2 },
  error: { color: "red", fontSize: 12, marginTop: 4 },
  showPasswordBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  button: {
    backgroundColor: "#00bcd4",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  signupText: { marginTop: 25, textAlign: "center", color: "#555" },
  signupLink: { color: "#00bcd4", fontWeight: "bold" },
});
