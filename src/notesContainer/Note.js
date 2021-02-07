import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";


const onPressTitle = () => {
  console.log("title pressed");
};



const Note = (props) => {

const onPressTitle = () => {
    props.nav.navigation.navigate('NoteDetail',{note: props.note});
};

  return (
    <TouchableOpacity style={styles.container} onPress={onPressTitle}>
        <Text style={styles.titleText} onPress={onPressTitle}>{props.note.title}</Text>
        <Text style={styles.baseText} onPress={onPressTitle} numberOfLines={2}>{props.note.description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderColor: "grey",
    borderWidth: 2,
    height: 100,
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
    fontWeight: "bold"
  }
});

export default Note;
