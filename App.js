// App.js
// Wires the three screens together with a stack navigator.
// Home -> Results -> Details, matching the brief's navigation flow.

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import HomeScreen from "./screens/HomeScreen";
import ResultsScreen from "./screens/ResultsScreen";
import DetailsScreen from "./screens/DetailsScreen";

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: "#0D131C" },
  headerTintColor: "#F3F1E9",
  headerTitleStyle: { fontWeight: "600" },
  contentStyle: { backgroundColor: "#0D131C" },
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Weather App" }}
        />
        <Stack.Screen
          name="Results"
          component={ResultsScreen}
          options={({ route }) => ({ title: route.params?.city ?? "Results" })}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: "Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
