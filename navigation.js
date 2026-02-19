import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginView from "../views/LoginView";
import LocationsView from "../views/LocationsView";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginView} />
        <Stack.Screen name="Locations" component={LocationsView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
