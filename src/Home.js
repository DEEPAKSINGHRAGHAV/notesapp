import React, { Component } from 'react';  
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, TouchableOpacity } from 'react-native';

import Note from '../src/notesContainer/Note';

// const androidCredentials = {
//   clientId: "519798594684-uhanfipa6reccop9lbuul7egivshfvnd.apps.googleusercontent.com",
//   appId: "1:519798594684:ios:07016d37384624f5de3df9",
//   apiKey: "AIzaSyBLTLb1pQO50T8156hbyds0P4qrJ5v_DZ0",
//   databaseURL: "",
//   storageBucket: "",
//   messagingSenderId: "",
//   projectId: "",
// };


// const iosCredentials = {
//   clientId: "",
//   appId: "",
//   apiKey: "",
//   databaseURL: "",
//   storageBucket: "",
//   messagingSenderId: "",
//   projectId: "",
// };

// const credentials = Platform.select({
//   android: androidCredentials,
//   ios: iosCredentials,
// });

// const config = {
//   name: "SECONDARY_APP",
// };

// await firebase.initializeApp(credentials, config);

class Home extends Component {  
  constructor(props) {
    super(props);
  }

   state = {
      inProgressNetworkReq: false,
      notesList: [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28badadgge',
          title: 'First Item',
          description: 'First Item First Item First Item First Item First Item First Item First Item First Item First Item First Item' 
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63cdda',
          title: 'Second Item',
          description: 'First Item First Item First Item First Item First Item First Item First Item First Item First Item First Item' 
        
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72545454',
          title: 'Third Item',
          description: 'First Item First Item First Item First Item First Item First Item First Item First Item First Item First Item' 
        
        },
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1211343',
          title: 'First Item',
          description: 'First Item First Item First Item First Item First Item First Item First Item First Item First Item First Item' 
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6322112',
          title: 'Second Item',
          description: 'First Item First Item First Item First Item First Item First Item First Item First Item First Item First Item' 
        
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d7232121',
          title: 'Third Item',
          description: 'First Item First Item First Item First Item First Item First Item First Item First Item First Item First Item' 
        
        },
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1212fgeheb',
          title: 'First Item',
          description: 'First Item First Item First Item First Item First Item First Item First Item First Item First Item First Item' 
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6322121rtte',
          title: 'Second Item',
          description: 'First Item First Item First Item First Item First Item First Item First Item First Item First Item First Item' 
        
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d7231313gege',
          title: 'Third Item',
          description: 'First Item First Item First Item First Item First Item First Item First Item First Item First Item First Item' 
        
        },
      ]
    }

//   componentDidMount() {

//   }

  renderItem({item},props) {
    return (
      <Note note={item} nav={props}/>
    );
  }


  render() {
  return (
    <SafeAreaView style={styles.container}>

    <TouchableOpacity style={styles.createIconBar} onPress={()=> this.props.navigation.navigate('createNote')}>
      <Image style={styles.createImage} source={require('../assets/create.png')} />
    </TouchableOpacity>

        <FlatList
        data={this.state.notesList}
        extraData={this.state}
        keyExtractor={item => item.id.toString()}
        renderItem={(item) => this.renderItem(item, this.props)}
        initialNumToRender={7}
        maxToRenderPerBatch={10}
        windowSize={4}
        getItemLayout={this.getItemLayout}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </SafeAreaView>
  );
}
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








import firebase from "@react-native-firebase/app";
import { Platform } from "react-native";