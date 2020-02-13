import React, { Component } from 'react';
import {
  StyleSheet, ScrollView,
  View, TextInput, Image, TouchableOpacity, PixelRatio
} from 'react-native';
import {
  Text,
  Item,
  Label,
  Input,
  Button,
} from 'native-base';
import Header from 'react-native/Libraries/NewAppScreen';
import firebase from './config'
import Form from 'react-native-form'
import SignaturePad from 'react-native-signature-pad'
import DatePicker from 'react-native-datepicker'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import ImagePicker from 'react-native-image-picker';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",   
      lastName: "",
      signature: "",
      date: "",
      email: "",
      photo: [],
     // imageSource: null,
      data: null,
      picture: null,
      //image_TAG: '',
      namePicture:'',
      nomPhoto:"",
      isSoulSold: false
    };

  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
      skipBackup: true
      }
    };
    
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
 
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
 
        this.setState({
 
          picture: source,
          data: response.data
 
        });
      }
    });
  }


  _onLeaveMessage() {
    this._onConcact();
  }

  async _onConcact() {
    var data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      date: this.state.date,
      picture: this.state.data,
      data: this.state.data,
      namePicture: this.state.namePicture,
      signature: this.state.signature.base64DataUrl
    };

    /* var dataA = {
      linkCNI: "sss",
      linkHomePlan: "ssss",
      linkPicture: "sss",
      linkRegisterDocument: "ssss",
      linkSignature: this.state.linkSignature
    } */


    if (this.state.firstName == '' || this.state.lastName == '' || this.state.signature == '' || this.state.picture == '') {
      alert("Veuillez remplir tous les champs")
      alert(this.state)
    }
    else {
      try {
        alert(JSON.stringify(data))
        return fetch('http://192.168.8.101:8088/api/v1/account',
          {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            
            body: JSON.stringify(data)
          }
        ).then((response) => response.json())
          .then((responseJson) => {

            //dataA.userId = responseJson.id;
            alert(JSON.stringify(data))
            alert(JSON.stringify(responseJson))
            console.log('result', responseJson)
            alert("operation succefull");

          }
          );
      }
      catch (errors) {
        alert("⛔Echec de l'envoie du message" + errors)
      }
    }

  }

  signaturePadChange(base64DataUrl) {
    this.setState({
      signature: base64DataUrl,
    })
   // alert(JSON.stringify(base64DataUrl))
   // alert(JSON.stringify(this.state.signature.base64DataUrl))

    
    //console.log('Base64', this.state.linkSignature.toDataURL("images/png"))
  }

  signaturePadError(error) {
    alert(JSON.stringify(error));
  }

  render() {
    return (

      <View style={styles.container}>
        <ProgressSteps>
          <ProgressStep label="Etape 1">
            
              <Text style={styles.title}>
                OUVERTURE DU COMPTE
                            </Text>
              <Text style={styles.text}>
                Veillez remplir le formulaire
                            </Text><Text></Text><Text></Text>
              <TextInput style={styles.inputBox}
                placeholder="firtName"
                value={this.state.firstName}
                placeholderTextColor='#000'
                selectionColor='#000'
                keyboardType="default"
                onSubmitEditing={() => this.firstName}
                onChangeText={firstName => this.setState({ firstName })}
              />
              <TextInput style={styles.inputBox}
              value={this.state.lastName}
                placeholder="lastName"
                placeholderTextColor='#000'
                selectionColor='#000'
                keyboardType="default"
                onSubmitEditing={() => this.lastName}
                onChangeText={lastName => this.setState({ lastName })}
              />

              <TextInput style={styles.inputBox}
                placeholder="Email"
                value={this.state.email}
                placeholderTextColor='#000'
                selectionColor='#000'
                keyboardType="default"
                onSubmitEditing={() => this.email}
                onChangeText={email => this.setState({ email })}
              />
              <Text></Text><Text></Text>
              <DatePicker
                style={{ width: 200 }}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                value={this.state.date}
                format="YYYY-MM-DD"
                //format="DD-MM-YYYY"
                //minDate="2016-05-01"
                //maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  placeholderText: {
                    color: '#0f0',
                    fontSize: 20
                  },
                  dateInput: {
                    marginLeft: 36,
                    borderWidth: 0
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => { this.setState({ date: date }) }}
              />
              <Text></Text><Text></Text>
          </ProgressStep>

          <ProgressStep label="Etape2">
        <View style={styles.formContainer}>

        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
           <View style={styles.ImageContainer}>
            {this.state.picture === null ? <Text>prendre une photo</Text> :
              <Image style={styles.ImageContainer} source={this.state.picture} />
            }
          </View>
        </TouchableOpacity>
        <TextInput 
        placeholder="Nom de l'image "
       // value={this.state.nomPhoto}
        onChangeText={data => this.setState({ namePicture: data })} 
        value={this.state.namePicture}
        underlineColorAndroid='transparent'
        style={styles.TextInputStyle}
         />
        </View>
        </ProgressStep>

          <ProgressStep label="Etape3" onSubmit={this._onLeaveMessage.bind(this)}>
        <View style={styles.formContainer}>

          <View style={styles.signature}>
            <Label style={styles.signatureLabel}>Veillez signer</Label>
            <SignaturePad
              onError={(error) => this.signaturePadError(error)}
              onChange={(signature) => this.signaturePadChange(signature)}
              value={this.state.signature}
              style={styles.signaturePad}
              onSubmitEditing={() => this.signature}
            />
          </View>
        </View>
        </ProgressStep>
        </ProgressSteps>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  inputBox: {
    width: 200,
    height: 50,
    backgroundColor: '#FFF0F5',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
    paddingVertical: 12,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
   // backgroundColor: '#FFF8E1',
    paddingTop: 20
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5,
  },
  form: {
    width: '80%'
  },
  signature: {
    width: '100%',
    height: 150,
  },
  signaturePad: {
    flex: 1,
    margin: 10,
    backgroundColor: '#eee',
  },
  button: {
    margin: 10
  },
  label: {
    marginLeft: 15
  },
  input: {
    marginLeft: 25
  },
  item: {
    marginTop: 10
  },
  signatureLabel: {
    marginLeft: 15, marginTop: 15
  },
  ImageContainer: {
    borderRadius: 10,
    width: 250,
    height: 250,
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDDC39',
 
  },
  TextInputStyle: {
 
    textAlign: 'center',
    height: 40,
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#028b53',
    marginTop: 20
  }
});











/* import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
} from 'react-native';

import SignatureCapture from 'react-native-signature-capture';

class App extends Component {
  saveSign = () => {
    this.refs['sign'].saveImage();
  };

  resetSign = () => {
    this.refs['sign'].resetImage();
  };

  _onSaveEvent = result => {
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    alert('Signature Captured Successfully');
    alert("picture", result.encoded);
    alert("chemin", result.pathName);
    console.log("Signature", result.encoded);
    console.log("Signature", result.pathName);
  };

  _onDragEvent = () => {
    // This callback will be called when the user enters signature
    console.log('dragged');
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.body}>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text style={styles.header}>
                Example to Capture Signature in React Native
              </Text>
              <SignatureCapture
                style={styles.signature}
                ref="sign"
                onSaveEvent={this._onSaveEvent}
                onDragEvent={this._onDragEvent}
                showNativeButtons={false}
                showTitleLabel={false}
                saveImageFileInExtStorage={false}
                viewMode={'portrait'}
              />
              <View style={{ flexDirection: 'row' }}>
                <TouchableHighlight
                  style={styles.buttonStyle}
                  onPress={() => {
                    this.saveSign();
                  }}>
                  <Text>Save</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.buttonStyle}
                  onPress={() => {
                    this.resetSign();
                  }}>
                  <Text>Reset</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
    paddingVertical: 20,
  },
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#eeeeee',
    margin: 10,
  },
});

export default App;  */