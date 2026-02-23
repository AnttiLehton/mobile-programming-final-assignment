
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createContext, useState } from "react";



import LoginView from "./LoginView";
import MainPage from "./MainPage";

export const UserContext = createContext(null);


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{user, setUser}}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginView} />
      <Stack.Screen name="Main" component={MainPage} />


      </Stack.Navigator>
    </NavigationContainer>
    </UserContext.Provider>
  );
}
