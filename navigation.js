
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createContext, useState } from "react";



import LoginView from "./LoginView";
import RegisterView from "./RegisterView";
import MainPage from "./MainPage";
import AddLocation from "./AddLocation";
import CountrySearch from "./CountrySearch";
import Map from "./map";

export const UserContext = createContext(null);


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{user, setUser}}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginView} />
      <Stack.Screen name="Register" component={RegisterView} />
      <Stack.Screen name="Main" component={MainPage} />
      <Stack.Screen name="AddLocation" component={AddLocation} />
      <Stack.Screen name="CountrySearch" component={CountrySearch} />
      <Stack.Screen name="map" component={Map} />


      </Stack.Navigator>
    </NavigationContainer>
    </UserContext.Provider>
  );
}