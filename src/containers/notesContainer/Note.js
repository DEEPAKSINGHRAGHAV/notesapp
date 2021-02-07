import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

import { primaryColor, whiteGrey } from "../../common/config";
import { firestoreService } from '../../services/firestoreService';

const Note = (props) => {

    const onPressDeleteNote = async() => {
        await firestoreService.deleteNoteByID(props.note.id);
    };

    const onPressTitle = () => {
        props.nav.navigation.navigate('NoteDetail',{note: props.note});
    };

  return (
    <TouchableOpacity style={styles.container} onPress={onPressTitle}>
        <Icon style={styles.trashIcon} name="trash" size={25} color="red" onPress={onPressDeleteNote}/>
        <Text style={styles.titleText} onPress={onPressTitle}>{props.note.title}</Text>
        <Text style={styles.baseText} onPress={onPressTitle} numberOfLines={2}>{props.note.description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderColor: whiteGrey,
    borderWidth: 2,
    height: 100,
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
    color: primaryColor
  },
  trashIcon: {
    position: "absolute",
    right: 10,
    zIndex: 200
  }
});

export default Note;
