import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";

const AuthScreen = (props) => {
  // const bodyText = useState("This is not really a bird nest.");



  const onPressTitle = async() => {
    props.navigation.navigate('Home');
    // const usersCollection = await firestore().collection('notes').doc('FxspASIP1aiFRvrnbYap').get();
    // console.log(usersCollection);
  };

  return (
    <Text style={styles.baseText}>
      <Text style={styles.titleText} onPress={onPressTitle}>
        AUTH SCREEN
      </Text> 
    </Text>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontFamily: "Cochin",
    marginTop: 100
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default AuthScreen;
