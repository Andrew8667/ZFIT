import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { supabase } from "./lib/supabase";
import { Session } from "@supabase/supabase-js";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import Finished from "./screens/Finished";
import Create from "./screens/Create";
import Progress from "./screens/Progress";
import AddExercise from "./screens/AddExercise";
import Highlights from "./screens/Highlights";
import { Provider } from "react-redux";
import { store } from "./store/store";
import MyWorkout from "./screens/MyWorkout";
import CreateProgram from "./screens/CreateProgram";
import { createContext } from "react";

const Stack = createNativeStackNavigator();
export const UserContext = createContext<string>('');

/**
 * Contains all the possible screens to navigate to in the app
 * @returns the navigation for the app
 */
export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const userId = session?.user?.id??''

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <UserContext.Provider value={userId}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="CreateProgram">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false, animation: "none" }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ headerShown: false, animation: "none" }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false, animation: "none" }}
            />
            <Stack.Screen
              name="Finished"
              component={Finished}
              options={{ headerShown: false, animation: "none" }}
            />
            <Stack.Screen
              name="Create"
              component={Create}
              options={{ headerShown: false, animation: "none" }}
            />
            <Stack.Screen
              name="Progress"
              component={Progress}
              options={{ headerShown: false, animation: "none" }}
            />
            <Stack.Screen
              name="AddExercise"
              component={AddExercise}
              options={{ headerShown: false, animation: "none" }}
            />
            <Stack.Screen
              name="MyWorkout"
              component={MyWorkout}
              options={{ headerShown: false, animation: "none" }}
            />
            <Stack.Screen
              name="Highlights"
              component={Highlights}
              options={{ headerShown: false, animation: "none" }}
            />
            <Stack.Screen
              name="CreateProgram"
              component={CreateProgram}
              options={{ headerShown: false, animation: "none" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </UserContext.Provider>
  );
}
