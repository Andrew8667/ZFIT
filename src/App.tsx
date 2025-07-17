import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { supabase } from './lib/supabase'
import { View, Text } from 'react-native'
import { Session } from '@supabase/supabase-js'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Home from './screens/Home'
import Archives from './screens/Archives'
import Create from './screens/Create'
import Progress from './screens/Progress'
import AddExercise from './screens/AddExercise' 
import MyExercises from './screens/MyExercises';
import {Provider} from "react-redux";
import {store} from './store/store'
import MyWorkout from './screens/MyWorkout';

const Stack = createNativeStackNavigator();

/**
 * Contains the navigation and keeps track of the session for the entire app 
 * @returns navigation for the screens throughout the app
 */
export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false,animation: 'none'}}
        />
        <Stack.Screen 
          name="Signup" 
          component={Signup} 
          options={{ headerShown: false,animation: 'none' }}
        />
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ headerShown: false,animation: 'none' }}
        />
        <Stack.Screen 
          name="Archives" 
          component={Archives} 
          options={{ headerShown: false,animation: 'none' }}
        />
        <Stack.Screen 
          name="Create" 
          component={Create} 
          options={{ headerShown: false,animation: 'none' }}
        />
        <Stack.Screen 
          name="Progress" 
          component={Progress} 
          options={{ headerShown: false,animation: 'none' }}
        />
        <Stack.Screen 
          name="AddExercise" 
          component={AddExercise} 
          options={{ headerShown: false,animation: 'none' }}
        />
        <Stack.Screen 
          name="MyWorkout" 
          component={MyWorkout} 
          options={{ headerShown: false,animation: 'none' }}
        />
        <Stack.Screen 
          name="MyExercises" 
          component={MyExercises} 
          options={{ headerShown: false,animation: 'none' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}
