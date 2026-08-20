// screens/ResultsScreen.js
// Assigned to: Member A
//
// What it teaches: fetch/async-await on screen mount, and the three states
// every network screen needs to handle — loading, error, and success.
// Conditional rendering picks which of the three to show.

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { geocodeCity, fetchWeather, describeWeatherCode } from "../utils/weatherApi";

export default function ResultsScreen({ route, navigation }) {
  const { city } = route.params;

  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus("loading");
      try {
        const loc = await geocodeCity(city);
        const data = await fetchWeather(loc.lat, loc.lon);
        if (cancelled) return;
        setLocation(loc);
        setWeather(data);
        setStatus("success");
      } catch (err) {
        if (cancelled) return;
        setErrorMessage(err.message || "Something went wrong");
        setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [city]);

  if (status === "loading") {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#5B9BD1" />
        <Text style={styles.loadingText}>Fetching weather for {city}…</Text>
      </View>
    );
  }

  if (status === "error") {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Couldn't get weather</Text>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.retryButtonText}>Try another city</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // status === "success"
  const condition = describeWeatherCode(weather.current.weatherCode);

  return (
    <View style={styles.container}>
      <Text style={styles.locationName}>
        {location.name}
        {location.admin1 ? `, ${location.admin1}` : ""}
      </Text>
      <Text style={styles.locationCountry}>{location.country}</Text>

      <View style={styles.card}>
        <Text style={styles.icon}>{condition.icon}</Text>
        <Text style={styles.temp}>{Math.round(weather.current.tempC)}°C</Text>
        <Text style={styles.condition}>{condition.label}</Text>
      </View>

      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() =>
          navigation.navigate("Details", {
            location,
            weather,
          })
        }
      >
        <Text style={styles.detailsButtonText}>See Details →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D131C",
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  center: {
    flex: 1,
    backgroundColor: "#0D131C",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  loadingText: {
    color: "#7A8B9E",
    marginTop: 12,
    fontSize: 14,
  },
  errorTitle: {
    color: "#D1495B",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  errorMessage: {
    color: "#8FA3B8",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#151E29",
    borderWidth: 1,
    borderColor: "#2A3646",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  retryButtonText: {
    color: "#F3F1E9",
    fontSize: 14,
    fontWeight: "600",
  },
  locationName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#F3F1E9",
  },
  locationCountry: {
    fontSize: 13,
    color: "#7A8B9E",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#151E29",
    borderWidth: 1,
    borderColor: "#2A3646",
    borderRadius: 16,
    paddingVertical: 32,
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    fontSize: 56,
    marginBottom: 8,
  },
  temp: {
    fontSize: 42,
    fontWeight: "700",
    color: "#F3F1E9",
  },
  condition: {
    fontSize: 15,
    color: "#8FA3B8",
    marginTop: 4,
  },
  detailsButton: {
    backgroundColor: "#5B9BD1",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  detailsButtonText: {
    color: "#0D131C",
    fontSize: 16,
    fontWeight: "600",
  },
});
