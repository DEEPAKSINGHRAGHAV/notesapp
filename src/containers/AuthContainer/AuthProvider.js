import React, {createContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '519798594684-tp07qofo40kvcb15qvq0qj5vgf2im071.apps.googleusercontent.com',
    });
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            // Login (Firebase Auth)
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            
          }
        },
        googleLogin: async () => {
          try {
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            await auth().signInWithCredential(googleCredential);
          } catch(error) {
            
          }
        },   
        register: async (email, password) => {
          try {
            // Registration (Firebase Auth)
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            
          }
        },
        logout: async () => {
          try {
            // Logout fn
            await auth().signOut();
          } catch (e) {
            
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
