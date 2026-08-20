// screens/HomeScreen.js
// Assigned to: Member A
//
// What it teaches: a controlled text input + a submit button that hands off
// to the next screen via navigation params. This screen does no fetching
// itself — it just collects the city name and navigates.

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function HomeScreen({ navigation }) {
  const [city, setCity] = useState("");

  function handleSearch() {
    const trimmed = city.trim();
    if (trimmed.length === 0) return; // ignore empty submits
    navigation.navigate("Results", { city: trimmed });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Weather App</Text>
      <Text style={styles.subtitle}>Search a city to see current conditions</Text>

      <TextInput
        style={styles.input}
        placeholder="e.g. Nairobi, Kyoto, Lima…"
        placeholderTextColor="#8A93A3"
        value={city}
        onChangeText={setCity}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
        autoCapitalize="words"
        autoCorrect={false}
      />

      <TouchableOpacity
        style={[styles.button, city.trim().length === 0 && styles.buttonDisabled]}
        onPress={handleSearch}
        disabled={city.trim().length === 0}
      >
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D131C",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#F3F1E9",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#7A8B9E",
    marginBottom: 28,
  },
  input: {
    backgroundColor: "#151E29",
    borderWidth: 1,
    borderColor: "#2A3646",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#F3F1E9",
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#5B9BD1",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#2A3646",
  },
  buttonText: {
    color: "#0D131C",
    fontSize: 16,
    fontWeight: "600",
  },
});
