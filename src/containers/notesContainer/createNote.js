// This the page that is opened when "create new note image" on right corner is clicked

import React, {useContext, useState} from 'react';

import NoteForm from "../../components/NoteForm";
import {AuthContext} from '../AuthContainer/AuthProvider';
import { firestoreService } from '../../services/firestoreService';

const createNote = (props) => {
  const [title, onChangeTitle] = React.useState();
  const [description, onChangeDesc] = React.useState();
  const {user} = useContext(AuthContext);

  // This fn saves the created title and description
  const saveNote = async() => {
    // firestoreService file has all firestore functions for CRUD
    await firestoreService.createNote(user.uid, title, description);
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

export default createNote;