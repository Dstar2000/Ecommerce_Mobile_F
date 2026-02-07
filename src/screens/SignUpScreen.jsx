import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Animated,
  ActivityIndicator,
} from "react-native";
import { register } from "../services/auth.service";

export default function SignupScreen({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    shopName: "",
    role: "customer",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Animated values for floating labels
  const animatedValues = {
    name: useRef(new Animated.Value(0)).current,
    email: useRef(new Animated.Value(0)).current,
    password: useRef(new Animated.Value(0)).current,
    phone: useRef(new Animated.Value(0)).current,
    address: useRef(new Animated.Value(0)).current,
    shopName: useRef(new Animated.Value(0)).current,
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

  // Validation
  const validate = () => {
    const newErrors = {};
    // Required fields
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Invalid email format";

    if (!form.password) newErrors.password = "Password is required";

    // Optional phone validation
    if (form.phone && !/^\d{10}$/.test(form.phone))
      newErrors.phone = "Phone must be 10 digits";

    // Shop owner required field
    if (form.role === "shopOwner" && !form.shopName)
      newErrors.shopName = "Shop Name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await register({
        ...form,
        shopName: form.role === "shopOwner" ? form.shopName : undefined,
      });

      if (res.data.success) {
        Alert.alert("Success", "Registration successful! Please login.");
        navigation.navigate("Login");
      }
    } catch (err) {
      console.log("SIGNUP ERROR 👉", err.response?.data || err.message);
      Alert.alert(
        "Signup Failed",
        err.response?.data?.message || "Server error",
      );
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (
    key,
    label,
    secure = false,
    keyboard = "default",
    required = false,
  ) => {
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
          {label} {required && <Text style={{ color: "red" }}>*</Text>}
        </Animated.Text>
        <TextInput
          style={styles.input}
          value={form[key]}
          onChangeText={(val) => handleChange(key, val)}
          onFocus={() => handleFocus(key)}
          onBlur={() => handleBlur(key)}
          secureTextEntry={secure}
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
      <Text style={styles.title}>Sign Up</Text>

      {renderInput("name", "Name", false, "default", true)}
      {renderInput("email", "Email", false, "email-address", true)}
      {renderInput("password", "Password", true, "default", true)}
      {renderInput("phone", "Phone", false, "phone-pad")}
      {renderInput("address", "Address")}

      {/* Role Selection */}
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[
            styles.roleButton,
            form.role === "customer" && styles.roleActive,
          ]}
          onPress={() => setForm({ ...form, role: "customer" })}
        >
          <Text
            style={[
              styles.roleText,
              form.role === "customer" && styles.roleTextActive,
            ]}
          >
            Customer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleButton,
            form.role === "shopOwner" && styles.roleActive,
          ]}
          onPress={() => setForm({ ...form, role: "shopOwner" })}
        >
          <Text
            style={[
              styles.roleText,
              form.role === "shopOwner" && styles.roleTextActive,
            ]}
          >
            Shop Owner
          </Text>
        </TouchableOpacity>
      </View>

      {form.role === "shopOwner" &&
        renderInput("shopName", "Shop Name", false, "default", true)}

      {/* Signup Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 30,
    paddingTop: 50,
    paddingBottom: 50,
    backgroundColor: "#fff",
  },
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 30 },
  input: {
    height: 50,
    fontSize: 16,
    color: "#000",
    paddingTop: 14,
    paddingHorizontal: 0,
  },
  underline: {
    height: 1.5,
    width: "100%",
    marginTop: 2,
  },
  error: { color: "red", marginTop: 4, fontSize: 12 },
  roleContainer: { flexDirection: "row", marginBottom: 25 },
  roleButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    alignItems: "center",
    marginRight: 5,
  },
  roleActive: { backgroundColor: "#00bcd4", borderColor: "#00bcd4" },
  roleText: { color: "#000", fontWeight: "bold" },
  roleTextActive: { color: "#fff" },
  button: {
    backgroundColor: "#00bcd4",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  loginText: { marginTop: 20, textAlign: "center", color: "#555" },
  loginLink: { color: "#00bcd4", fontWeight: "bold" },
});
