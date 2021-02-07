import React from 'react';
import { TextInput, View, StyleSheet, SafeAreaView, Text, Button } from 'react-native';

import { firestoreService } from '../services/firestoreService';

const createNote = (props) => {
  const [title, onChangeTitle] = React.useState();
  const [description, onChangeDesc] = React.useState();

  const saveNote = async() => {
    console.log("save fn called");
    await firestoreService.createNote("userid5678", title, description);
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
      fontFamily: "Cochin",
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

export default createNote;