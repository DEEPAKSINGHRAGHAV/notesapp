// This is the Home Page where all lists of notes are shown

import React, { Component, useContext, useState, useEffect } from 'react';  
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, TouchableOpacity } from 'react-native';

import {AuthContext} from '../src/containers/AuthContainer/AuthProvider';
import Note from '../src/containers/notesContainer/Note';
import { appString, whiteColor, whiteGrey } from './common/config';
import { firestoreService } from './services/firestoreService';

function Home(props)  {  
  const {logout} = useContext(AuthContext);
  const {user} = useContext(AuthContext);

  const [notes, setNotes] = useState([]);
  const [inProgressNetworkReq, setinProgressNetworkReq] = useState(false);

  // This fn get all notes and store in state variable
 async function getNotes() {
    const snapshot = await firestoreService.getNotes(user.uid);
    let notes = [];
    snapshot.forEach(doc => {
      let note = {};
      console.log(doc.id, '=>', doc.data());
      note.id = doc.id;
      note.title = doc.data().title;
      note.description = doc.data().description;
      note.userid = doc.data().userid;
      notes.push(note);
    });
    setNotes(notes);
  }

  useEffect(() => {
    getNotes();
  });

  // This is a function that render single note in lists of notes
  function renderItem({item},props) {
    return (
      <Note note={item} nav={props}/>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

    <TouchableOpacity style={styles.createIconBar} onPress={()=> props.navigation.navigate('createNote')}>
      <TouchableOpacity style={styles.logoutBtn}>
        <Text style={styles.logoutTxt} onPress={()=> logout()}>{appString.logout}</Text>
      </TouchableOpacity>
      
      <View>
      <Image style={styles.createImage} source={require('../assets/create.png')} />
      </View>
      
    </TouchableOpacity>
      {notes.length==0?<View style={styles.noNotesContainer}><Text style={styles.noNotes}>No Notes</Text></View>:null}
        <FlatList
        data={notes}
        extraData={notes}
        keyExtractor={item => item.id.toString()}
        renderItem={(item) => renderItem(item, props)}
        initialNumToRender={7}
        maxToRenderPerBatch={10}
        windowSize={4}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: whiteColor
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  createIconBar: {
    position: "absolute",
    zIndex: 100,
    backgroundColor: whiteGrey,
    bottom: 0,
    right: 0,
    height: 50,
    width: "100%"
  },
  logoutBtn: {
    position: "absolute",
    fontSize: 18,
    fontWeight: "bold",
    zIndex: 100,
    minHeight: 50,
    minWidth: 100

  },
  logoutTxt: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    padding: 5
  },
  createImage: {
    height: 40,
    width: 40,
    position: "absolute",
    right: 10,
    top: 5
  },
  noNotesContainer:{ 
    flex: 1,
    justifyContent: "center",
    alignSelf: "center" },
  noNotes: {
    fontSize: 25
  }
});

export default Home;