// screens/DetailsScreen.js
// Assigned to: Member B
//
// What it teaches: reading data passed forward via navigation params
// (no re-fetching needed here — Results already has everything), and
// rendering a small forecast list with FlatList.

import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { describeWeatherCode } from "../utils/weatherApi";

function windCompass(deg) {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
}

function formatDay(dateString) {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

export default function DetailsScreen({ route }) {
  const { location, weather } = route.params;
  const { current, daily } = weather;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {location.name} — Details
      </Text>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Feels like</Text>
          <Text style={styles.statValue}>{Math.round(current.feelsLikeC)}°C</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Humidity</Text>
          <Text style={styles.statValue}>{Math.round(current.humidity)}%</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Wind</Text>
          <Text style={styles.statValue}>
            {Math.round(current.windSpeedKmh)} km/h {windCompass(current.windDirDeg)}
          </Text>
        </View>
      </View>

      <Text style={styles.forecastHeading}>5-Day Forecast</Text>
      <FlatList
        data={daily}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => {
          const condition = describeWeatherCode(item.weatherCode);
          return (
            <View style={styles.forecastRow}>
              <Text style={styles.forecastDay}>{formatDay(item.date)}</Text>
              <Text style={styles.forecastIcon}>{condition.icon}</Text>
              <Text style={styles.forecastCondition}>{condition.label}</Text>
              <Text style={styles.forecastTemps}>
                {Math.round(item.maxC)}° / {Math.round(item.minC)}°
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D131C",
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#F3F1E9",
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  statBox: {
    backgroundColor: "#151E29",
    borderWidth: 1,
    borderColor: "#2A3646",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 10,
    color: "#7A8B9E",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    color: "#F3F1E9",
    fontWeight: "600",
  },
  forecastHeading: {
    fontSize: 14,
    color: "#7A8B9E",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
  },
  forecastRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#151E29",
    borderWidth: 1,
    borderColor: "#2A3646",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  forecastDay: {
    width: 90,
    fontSize: 13,
    color: "#F3F1E9",
    fontWeight: "600",
  },
  forecastIcon: {
    fontSize: 18,
    width: 30,
  },
  forecastCondition: {
    flex: 1,
    fontSize: 12,
    color: "#8FA3B8",
  },
  forecastTemps: {
    fontSize: 13,
    color: "#F3F1E9",
    fontWeight: "600",
  },
});
