//This is the page that is opened when you click on any already existed note

import React, {useContext, useState} from 'react';
import analytics from '@react-native-firebase/analytics';

import NoteForm from '../../components/NoteForm';
import {AuthContext} from '../AuthContainer/AuthProvider';
import { firestoreService } from '../../services/firestoreService';

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
    <NoteForm
    title={title}
    description={description}
    saveNote={saveNote}
    onChangeTitle={onChangeTitle} 
    onChangeDesc={onChangeDesc}
    />
  );
}

export default NoteDetail;