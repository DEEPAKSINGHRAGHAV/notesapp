import React, {useContext, useState} from 'react';
import { TextInput, View, StyleSheet, SafeAreaView, Text, Button } from 'react-native';

import {AuthContext} from '../AuthContainer/AuthProvider';
import { firestoreService } from '../../services/firestoreService';

const NoteDetail = (props) => {
  const [title, onChangeTitle] = React.useState(props.route.params.note.title);
  const [description, onChangeDesc] = React.useState(props.route.params.note.description);
  const {user} = useContext(AuthContext);

  const saveNote = async() => {
    await firestoreService.updateNoteByID(props.route.params.note.id, user.uid, title, description);
    };

  return (
      <SafeAreaView style={styles.container}>

          <View>
            <Text style={styles.titleText}>Title</Text>
            <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => onChangeTitle(text)}
            value={title}
            />
        </View>
        <View style={styles.descriptionContainer}>
            <Text style={styles.titleText}>Description</Text>
            <TextInput
            style={{ height: "80%", borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => onChangeDesc(text)}
            value={description}
            multiline={true}
            autoFocus={true}
            />
        </View>
        <Button
        onPress={saveNote}
        title="Save"
        color="#841584"
        accessibilityLabel="Click to Save"
        />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      width: "100%",
      borderColor: "grey",
      borderWidth: 2,
      height: "100%",
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
      marginBottom: 2
    },
    descriptionContainer: {
      marginVertical: 30
    }
  });

export default NoteDetail;