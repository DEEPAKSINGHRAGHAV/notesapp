import firestore from '@react-native-firebase/firestore';

// Contains all firestore function for creating, Adding, Updating , Deleting documents
export class firestoreService {

    //This fn gets all notes of particular user
    static async getNotes(id){
        try{
            const notes = await firestore().collection('notes').where('userid','==', id).get();
            return notes;
        } catch(e) {
            console.log(e);
        }   
    }

    //This fn gets single note (document) based on ID
    static async getNoteByID(id){
        const note = await firestore().collection('notes').doc(id).get();
        return note;
    }

    //This fn gets create a new note in collection
    static async createNote(userid, title, description){
        try{
        await firestore().collection('notes').add({
            title: title,
            description: description,
            userid: userid
        });
    } catch(e) {
        console.log(e);
    }
    }

    //This fn gets update a note in collection based on ID
    static async updateNoteByID(id, userid, title, description){
        firestore().collection('notes').doc(id).set({
            title: title,
            description: description,
            userid: userid
        })
    }

    //This fn gets deletes a note in collection based on ID
    static async deleteNoteByID(id){
        firestore().collection('notes').doc(id).delete();
    }
    
}