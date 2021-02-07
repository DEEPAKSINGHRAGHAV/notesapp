import firestore from '@react-native-firebase/firestore';

export class firestoreService {

    static async getNotes(id){
        try{
            const notes = await firestore().collection('notes').where('userid','==', id).get();
            return notes;
        } catch(e) {
            console.log(e);
        }   
    }

    static async getNoteByID(id){
        const note = await firestore().collection('notes').doc(id).get();
        return note;
    }

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

    static async updateNoteByID(id, userid, title, description){
        firestore().collection('notes').doc(id).set({
            title: title,
            description: description,
            userid: userid
        })
    }

    static async deleteNoteByID(id){
        firestore().collection('notes').doc(id).delete();
    }
    
}