// This the page that is opened when "create new note image" on right corner is clicked

import React, {useContext, useState} from 'react';
import { TextInput, View, StyleSheet, SafeAreaView, Text, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { appString, primaryColor, whiteColor, whiteGrey } from "../common/config";

const NoteForm = (props) => {
  
  return (
      <SafeAreaView style={styles.container}>
          <View>
            <Text style={styles.titleText}>{appString.title}</Text>
            <TextInput
            style={{ height: 40, borderColor: '#DCD5D4', borderWidth: 1 }}
            onChangeText={text => props.onChangeTitle(text)}
            value={props.title}
            />
        </View>
        <View style={styles.descriptionContainer}>
            <Text style={styles.titleText}>{appString.description}</Text>
            <TextInput
            style={{ height: "80%", borderColor: '#DCD5D4', borderWidth: 1 }}
            onChangeText={text => props.onChangeDesc(text)}
            value={props.description}
            multiline={true}
            autoFocus={true}
            />
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={props.saveNote}>
          <Text style={styles.savetxt}>{appString.save}</Text>
        </TouchableOpacity>
        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      width: "100%",
      borderColor: whiteGrey,
      borderWidth: 2,
      height: "70%",
      padding: 10, 
      marginRight: 5,
      marginVertical: 3
    },
    baseText: {
      padding: 10
    },
    titleText: {
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 2,
      color: primaryColor
    },
    descriptionContainer: {
      marginVertical: 30
    },
    saveBtn:{
      alignSelf: "center",
      width: 150,
      alignItems: "center",
      justifyContent: "center",
      height: 50,
      backgroundColor: primaryColor,
      borderRadius: 40
    },
    savetxt: {
      color: whiteColor,
      fontSize: 20
    }
  });

export default NoteForm;