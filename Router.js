import React, {useContext, useState, useEffect} from 'react';
import { Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/analytics';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {AuthContext} from './src/containers/AuthContainer/AuthProvider';
import Home from './src/Home';
import NoteDetail from './src/containers/notesContainer/NoteDetail';
import createNote from './src/containers/notesContainer/createNote';
import Login from './src/containers/AuthContainer/Login';
import Signup from './src/containers/AuthContainer/Signup';

const Stack = createStackNavigator();

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  // fn to enable Firebase Analytics
  const enableAnalytics = async() => {
    await firebase.analytics().setAnalyticsCollectionEnabled(true);
  }

  useEffect(() => {
    enableAnalytics();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    // Two stack navigator based on login/logout
    <NavigationContainer>
      {user ? <Stack.Navigator>
        <Stack.Screen options={({ route }) => ({ headerShown: false })} name="Home" component={Home} />
        <Stack.Screen options={({ route }) => ({ headerTitle: props => <Text>Detail</Text>})} name="NoteDetail" component={NoteDetail} />
        <Stack.Screen options={({ route }) => ({ headerTitle: props => <Text>create Note</Text>})} name="createNote" component={createNote} />
      </Stack.Navigator> : 
      <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{header: () => null}} />
      <Stack.Screen name="Signup" component={Signup}
        options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
            shadowColor: '#f9fafd',
            elevation: 0,
          },
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <FontAwesome.Button 
                name="long-arrow-left"
                size={25}
                backgroundColor="#f9fafd"
                color="#333"
                onPress={() => navigation.navigate('Login')}
              />
            </View>
          ),
        })}
      />
    </Stack.Navigator>}
    </NavigationContainer>
  );
};

export default Routes;