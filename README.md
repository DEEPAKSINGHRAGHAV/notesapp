# notesapp

#Instructions for Android:

1.)  npm i
2.) ./gradlew clean
3.) react-native run-android


#Instructions for iOS:

1.) cd ios/
2.) pod install
3.) run from xcode


#Feature Implemented:

1. Firebase authentication (email & password)
2. Google sign-in
3. Firebase Firestore Database (No SQL)
4. Listing of notes
5. Adding/ Editing / Deletion of notes.
6. Firebase Analytics


Issue:
Google sign -in not working in ios (To use google sign-in in ios, it is mandatory to have a Apple sign-in )
More details here:
https://developer.apple.com/news/?id=09122019b

Work around:
To check the notes for specific user, I have integrated email & password signup and login.



Perfomance improvisation:

1. Note.js was a child component of Home.js. Used shouldcomponentupdate lifecycle inside "Note.js" to avoid re-rendering.
2. CreateNote.js & NoteDetail.js had almost same JSX so made that thing modular. 
    "src/components/NoteForm.js"
3. Removed all console.log()