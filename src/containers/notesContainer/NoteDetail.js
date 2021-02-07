//This is the page that is opened when you click on any already existed note

import React, {useContext, useState} from 'react';
import { TextInput, View, StyleSheet, SafeAreaView, Text, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import analytics from '@react-native-firebase/analytics';

import {AuthContext} from '../AuthContainer/AuthProvider';
import { firestoreService } from '../../services/firestoreService';
import { appString, primaryColor, whiteColor, whiteGrey } from '../../common/config';

const NoteDetail = (props) => {
  const [title, onChangeTitle] = React.useState(props.route.params.note.title);
  const [description, onChangeDesc] = React.useState(props.route.params.note.description);
  const {user} = useContext(AuthContext);

  const saveNote = async() => {
    const noteID = props.route.params.note.id; // id as paramter coming from Home.js

    // firestoreService file has all firestore functions for CRUD
    await firestoreService.updateNoteByID(noteID, user.uid, title, description);
    await analytics().logEvent('noteEdit', {
      id: noteID,
      title: title,
      description: description,
      userid: user.id
    })
    props.navigation.goBack();
    };

  return (
      <SafeAreaView style={styles.container}>
          <View>
            <Text style={styles.titleText}>{appString.title}</Text>
            <TextInput
            style={{ height: 40, borderColor: '#DCD5D4', borderWidth: 1 }}
            onChangeText={text => onChangeTitle(text)}
            value={title}
            />
        </View>
        <View style={styles.descriptionContainer}>
            <Text style={styles.titleText}>{appString.description}</Text>
            <TextInput
            style={{ height: "80%", borderColor: '#DCD5D4', borderWidth: 1 }}
            onChangeText={text => onChangeDesc(text)}
            value={description}
            multiline={true}
            autoFocus={true}
            />
        </View>


        <TouchableOpacity style={styles.saveBtn} onPress={saveNote}>
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

export default NoteDetail;