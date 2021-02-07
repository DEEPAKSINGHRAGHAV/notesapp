import React, { Component, useContext, useState, useEffect } from 'react';  
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, TouchableOpacity } from 'react-native';

import {AuthContext} from '../src/containers/AuthContainer/AuthProvider';
import Note from '../src/containers/notesContainer/Note';
import { firestoreService } from './services/firestoreService';

function Home(props)  {  
  const {logout} = useContext(AuthContext);
  const {user} = useContext(AuthContext);

  const [notes, setNotes] = useState([]);
  const [inProgressNetworkReq, setinProgressNetworkReq] = useState(false);

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

  function renderItem({item},props) {
    return (
      <Note note={item} nav={props}/>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

    <TouchableOpacity style={styles.createIconBar} onPress={()=> props.navigation.navigate('createNote')}>
      <Text onPress={()=> logout()}> Logout </Text>
      <Image style={styles.createImage} source={require('../assets/create.png')} />
    </TouchableOpacity>

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
    backgroundColor: "#fff"
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
    backgroundColor: "#f2f2f2",
    bottom: 0,
    right: 0,
    height: 50,
    width: "100%"
  },
  createImage: {
    height: 50,
    width: 50,
    position: "absolute",
    right: 0
  }
});

export default Home;