import React from "react";
import { Button, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";

import Home from './src/Home';
import NoteDetail from './src/notesContainer/NoteDetail';
import AuthScreen from './src/AuthScreen';
import createNote from './src/notesContainer/createNote';

const Stack = createStackNavigator();

export default function App(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={({ route }) => ({ headerShown: false })} name="AuthScreen" component={AuthScreen} />
        <Stack.Screen options={({ route }) => ({ headerShown: false })} name="Home" component={Home} />
        <Stack.Screen options={({ route }) => ({ headerTitle: props => <Text>Detail</Text>})} name="NoteDetail" component={NoteDetail} />
        <Stack.Screen options={({ route }) => ({ headerTitle: props => <Text>create Note</Text>})} name="createNote" component={createNote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
