import React, { PureComponent, useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

import { primaryColor, whiteGrey } from "../../common/config";
import { firestoreService } from '../../services/firestoreService';

class Note extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      note: props.note
    }
  }
  
  //Have not used PureComponent because they were still re-rendering this component
  shouldComponentUpdate(prevProps, prevState) {
    if(prevProps.note.title !== this.props.note.title || prevProps.note.description !== this.props.note.description) {
        return true;
      }
      return false;
  }

   onPressDeleteNote = async() => {
        await firestoreService.deleteNoteByID(this.props.note.id);
    };

    onPressTitle = () => {
        this.props.nav.navigation.navigate('NoteDetail',{note: this.props.note});
    };

    render(){
      // console.log("child re-rendered");
      return (
        <TouchableOpacity style={styles.container} onPress={this.onPressTitle}>
            <Icon style={styles.trashIcon} name="trash" size={25} color="red" onPress={this.onPressDeleteNote}/>
            <Text style={styles.titleText}>{this.props.note.title}</Text>
            <Text style={styles.baseText}  numberOfLines={2}>{this.props.note.description}</Text>
        </TouchableOpacity>
      );
    }
}

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