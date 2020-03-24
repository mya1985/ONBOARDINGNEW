import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, GoogleMap, Marker } from 'react-native-maps';
import { StyleSheet, FlatList, View, TextInput, Image,
SafeAreaView, Keyboard, Modal, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity, PixelRatio } from 'react-native';
import { Text, Item, Label, Input, Button, Icon, Container} from 'native-base';
import Header from 'react-native/Libraries/NewAppScreen';
import firebase from './config'
import Form from 'react-native-form'
import SignaturePad from 'react-native-signature-pad'
import DatePicker from 'react-native-datepicker'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import ImagePicker from 'react-native-image-picker';
import PhoneInput from 'react-phone-number-input'
import { Dropdown } from 'react-native-material-dropdown';
import ModalDropdown from 'react-native-modal-dropdown';
import { validate } from 'validate.js';
import dataJSON from './Countries.js';


const defaultFlag = dataJSON.filter(
  obj => obj.name === 'United Kingdom'
  )[0].flag

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      signature: "",
      date: "",
      subDays: "",
      addDays: "",
      email: "",
      photo: [],
      // imageSource: null,
      data: null,
      picture: null,
      //image_TAG: '',
      namePicture: '',
      nomPhoto: "",
      isSoulSold: false,
      loading: true,
      region: {
        latitude: 3.8667,
        longitude: 11.5167,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      intitule: "",
      nomJeuneFille: "",
      nationalite: "",
      typePiece: "",
      numPiece: "",
      lieuNaissance: "",
      nomPere: "",
      nomMere: "",
      paysNaissance: "",
      situationFamilliale: "",
      regimeMatrimonial: "",
      nomConjoint: "",
      prenomConjoint: "",
      dateNaissanceConjoint: "",
      adresse: "",
      telephone: "",
      boitePostal: "",
      fax: "",
      email: "",
      profession: "",
      trancheRevenu: "",
      employeur: "",
      nomContact: "",
      prenomContact: "",
      telephoneConjoint: "",
      telephoneContact: "",
      adresseContact: "",
      isValid: false,
      errors: false,
      // displaymarred: false,
      civilite: '',
      dataE: { emailAddress: "example@gmail.com" },
      flag: defaultFlag,
      modalVisible: false,
      phoneNumber: '',

    };

    this.onNextStep1 = this.onNextStep1.bind(this)
    this.onNextStep2 = this.onNextStep2.bind(this)
    this.onNextStep3 = this.onNextStep3.bind(this)

  }

  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }
  showModal() {
    this.setState({ modalVisible: true })
  }
  hideModal() {
    this.setState({ modalVisible: false })
    // Refocus on the Input field after selecting the country code
    this.refs.PhoneInput._root.focus()
  }


  async getCountry(country) {
    const countryData = await dataJSON
    try {
      const countryCode = await countryData.filter(
        obj => obj.name === country
      )[0].dial_code
      const countryFlag = await countryData.filter(
        obj => obj.name === country
      )[0].flag
      // Set data from user choice of country
      this.setState({ phoneNumber: countryCode, flag: countryFlag })
      await this.hideModal()
    }
    catch (err) {
      console.log(err)
    }
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

  //   onNextStep1() {
  //     if(this.state.firstName == '' || this.state.lastName == '' || this.state.nomJeuneFille == ''
  //         || this.state.paysNaissance == '' || this.state.lieuNaissance == '' || this.state.nationalite == ''
  //         || this.state.date == '' || this.state.nomPere == '' || this.state.nomMere == '') {
  //       alert('Veuillez remplir tous les champs')
  //       this.setState({ errors: true });
  //     }
  //     else {
  //       this.setState({ errors: false });
  //     }
  // //const validationResult = validate(this.state.firstName, constraints);
  //     //this.setState({ errors: validationResult });
  //    /*  if (!this.state.isValid) {
  //       this.setState({ errors: true });
  //     } else {
  //       this.setState({ errors: false });
  //     } */
  //    // this.setState({ errors: true });
  // };

  onNextStep1() {

    if (this.state.civilite == 'Madame') {
      // alert(this.state.civilite)
      if (this.state.firstName == '' || this.state.lastName == '' || this.state.nomJeuneFille == ''
        || this.state.paysNaissance == '' || this.state.lieuNaissance == '' || this.state.nationalite == ''
        || this.state.date == '' || this.state.nomPere == '' || this.state.nomMere == '') {
        alert('Veuillez remplir tous les champs')
        this.setState({ errors: true });
      }
      else {
        this.setState({ errors: false });
      }

    } else if (this.state.civilite == 'Monsieur' || this.state.civilite == 'Mademoiselle' || this.state.civilite == '') {
      // alert(this.state.civilite)
      if (this.state.firstName == '' || this.state.lastName == ''
        || this.state.paysNaissance == '' || this.state.lieuNaissance == '' || this.state.nationalite == ''
        || this.state.date == '' || this.state.nomPere == '' || this.state.nomMere == '') {
        alert('Veuillez remplir tous les champs')
        this.setState({ errors: true });
      }
      else {
        this.setState({ errors: false });
      }

    }

    else {
      this.setState({ errors: true });
    }
  };

  onNextStep2() {
    if (this.state.telephone == '' || this.state.boitePostal == ''
      || this.state.profession == '' || this.state.numPiece == '' || this.state.employeur == '') {
      alert('Veuillez remplir tous les champs')
      this.setState({ errors: true });
      //this.setState({ errors: validationResult });
    }
    else {
      this.setState({ errors: false });
    }
  };

  onNextStep3() {
    if (this.state.situationFamilliale == 'Marie') {
      //alert(this.state.situationFamilliale)
      if (this.state.nomConjoint == '' || this.state.prenomConjoint == ''
        || this.state.adresse == '' || this.state.telephoneConjoint == '') {
        alert('Veuillez remplir tous les champs')
        this.setState({ errors: true });
      }
      else {
        this.setState({ errors: false });
      }

    } else if (this.state.situationFamilliale == 'Celibataire' || this.state.situationFamilliale == 'Divorce') {
      //alert(this.state.situationFamilliale)
      if (this.state.firstName == '' || this.state.lastName == ''
        || this.state.paysNaissance == '' || this.state.lieuNaissance == '' || this.state.nationalite == ''
        || this.state.date == '' || this.state.nomPere == '' || this.state.nomMere == '') {
        //alert('...')
        this.setState({ errors: true });
      }
      else {
        this.setState({ errors: false });
      }

    }

    else {
      this.setState({ errors: true });
    }

  };

  onNextStep4() {
   // alert(this.state.nomContact + this.state.prenomContact + this.state.telephoneContact)
     if (this.state.nomContact == '' || this.state.prenomContact == '' || this.state.telephoneContact == '') {
      alert('Veuillez remplir tous les champs')
      
      this.setState({ errors: true });
    }
    else {
      this.setState({ errors: false });
    } 
  };
  
  onNextStep5() {
   // alert(this.state.nomContact + this.state.prenomContact + this.state.telephoneContact)
     if (this.state.data == '' || this.state.picture == '') {
      alert('Veuillez remplir tous les champs')
      
      this.setState({ errors: true });
    }
    else {
      this.setState({ errors: false });
    } 
  };
  

  _onPressButton() {
    const validationResult = validate(this.state.dataE, constraints);
    // validationResult is undefined if there are no errors
    this.setState({ errors: validationResult });
  };

  getErrorMessages(separator = "\n") {
    const { errors } = this.state;
    if (!errors) return [];

    return Object.values(errors).map(it => it.join(separator)).join(separator);
  };

  getErrorsInField(field) {
    const { errors } = this.state;
    return errors && errors[field] || [];
  };

  isFieldInError(field) {
    const { errors } = this.state;
    return errors && !!errors[field];
  };

  _onLeaveMessage() {
    this._onConcact();
  };

  async _onConcact() {
    var data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      date: this.state.date,
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude,
      coordinate: this.state.coordinate,
      picture: this.state.data,
      data: this.state.data,
      namePicture: this.state.namePicture,
      signature: this.state.signature.base64DataUrl,
      intitule: this.state.intitule,
      nomJeuneFille: this.state.nomJeuneFille,
      nationalite: this.state.nationalite,
      typePiece: this.state.typePiece,
      numPiece: this.state.numPiece,
      lieuNaissance: this.state.lieuNaissance,
      nomPere: this.state.nomPere,
      nomMere: this.state.nomMere,
      paysNaissance: this.state.paysNaissance,
      situationFamilliale: this.state.situationFamilliale,
      regimeMatrimonial: this.state.regimeMatrimonial,
      nomConjoint: this.state.nomConjoint,
      dateNaissanceConjoint: this.state.dateNaissanceConjoint,
      adresse: this.state.adresse,
      telephone: this.state.telephone,
      boitePostal: this.state.boitePostal,
      fax: this.state.fax,
      email: this.state.email,
      profession: this.state.profession,
      trancheRevenu: this.state.trancheRevenu,
      employeur: this.state.employeur,
      nomContact: this.state.nomContact,
      prenomContact: this.state.prenomContact,
      telephoneConjoint: this.state.telephoneConjoint,
      prenomConjoint: this.state.prenomConjoint,
      telephoneContact: this.state.telephoneContact,
      adresseContact: this.state.adresseContact,
      civilite: this.state.civilite
    };

    if (this.state.signature == '') {
      alert("Veuillez remplir tous les champs")
      alert(this.state)
    }
    else {
      try {
        alert(JSON.stringify(data))
        return fetch('http://192.168.0.104:8088/api/v1/account',
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

  _onRegionChange() {
    this.setState({
      region
    });
  }


  render() {

    /*  let data1 = [{ value: 'Monsieur' }, { value: 'Madame' }, { value: 'Mademoiselle' },];
     let data2 = [{ value: 'CNI' }, { value: 'PASSPORT' }, { value: 'TITRE SEJOUR' },];
     let data3 = [{ value: 'MARIE' }, { value: 'CELIBATAIRE' }, { value: 'DIVORCE' },];
     let data4 = [{ value: 'MONOGAMIE' }, { value: 'POLYGAMIE' }, { value: 'POLYANDRIE' },];
     let data5 = [{ value: 'de 0 à 250' }, { value: 'de 250 à 750' }, { value: 'de 750 à 1000000' }, { value: '1000000 et plus' }];
  */

    let { flag } = this.state
    const countryData = dataJSON
    return (

      <View style={styles.container}>
        <ProgressSteps>
          <ProgressStep label="Etape 1" onNext={this.onNextStep1} errors={this.state.errors}>

            <Text style={styles.title}>
              OUVERTURE DU COMPTE
                            </Text>
            <Text style={styles.text}>
              Veillez remplir le formulaire
                            </Text><Text></Text>
            {/*  <Dropdown 
                label='intitulé'
                data={data1}
                onSelect={() => { 
                  this.state.displaymarred = true
                  
              }}  
              /> */}


            <ModalDropdown options={['Monsieur', 'Madame', 'Mademoiselle']}
              defaultValue='civilite'
              dropdownStyle={styles.dropdown_2_dropdown}
              textStyle={styles.dropdown_2_text}
              style={styles.dropdown}
              onSelect={(idx, value) => { this.setState({ civilite: value }) }}

            />

            <TextInput style={styles.inputBox}
              placeholder="Prenom"
              value={this.state.firstName}
              placeholderTextColor='#000'
              selectionColor='#000'
              keyboardType="default"
              onSubmitEditing={() => this.firstName}
              onChangeText={firstName => this.setState({ firstName })}
            />
            <TextInput style={styles.inputBox}
              value={this.state.lastName}
              placeholder="Nom"
              placeholderTextColor='#000'
              selectionColor='#000'
              keyboardType="default"
              onSubmitEditing={() => this.lastName}
              onChangeText={lastName => this.setState({ lastName })}
            />
            {this.state.civilite == 'Madame' ?
              <TextInput style={styles.inputBox}
                value={this.state.nomJeuneFille}
                placeholder="nomJeuneFille"
                placeholderTextColor='#000'
                selectionColor='#000'
                keyboardType="default"
                onSubmitEditing={() => this.nomJeuneFille}
                onChangeText={nomJeuneFille => this.setState({ nomJeuneFille })}
                underlineColorAndroid='transparent'
              //editable={this.state.displaymarred}
              //selectTextOnFocus={this.state.displaymarred}
              />
              :
              <Text></Text>
            }


            <ModalDropdown options={['Cameroun', 'Cote d Ivoire', 'Republique democratique du Congo', 'Guinee Conakry']}
              defaultValue='Pays de naissance'
              dropdownStyle={styles.dropdown_2_dropdown}
              textStyle={styles.dropdown_2_text}
              style={styles.dropdown}
              onSelect={(idx, value) => { this.setState({ paysNaissance: value }) }}
            // onSelect {...(value) => this.setState({gas: (String(this.state.options[value]))})}

            />
            <TextInput style={styles.inputBox}
              placeholder="lieu de naissance"
              value={this.state.lieuNaissance}
              placeholderTextColor='#000'
              selectionColor='#000'
              keyboardType="default"
              onSubmitEditing={() => this.lieuNaissance}
              onChangeText={lieuNaissance => this.setState({ lieuNaissance })}
            />


            <TextInput style={styles.inputBox}
              placeholder="nationalite"
              value={this.state.nationalite}
              placeholderTextColor='#000'
              selectionColor='#000'
              keyboardType="default"
              onSubmitEditing={() => this.nationalite}
              onChangeText={nationalite => this.setState({ nationalite })}
            />

            <Text></Text>
            <DatePicker
              style={{ width: 200 }}
              date={this.state.date}
              mode="date"
              placeholder="date de naissance"
              value={this.state.date}
              format="YYYY-MM-DD"
              //format="DD-MM-YYYY"
             // minDate="2016-05-01"
              //maxDate="2016-06-01"
             // minDate={subDays(new Date(), 5)}
              //minDate={new Date()}
              maxDate={new Date(), 2002}
              //maxDate={addDays(new Date(), 0)}   
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
            <Text></Text>
            <TextInput style={styles.inputBox}
              placeholder="nom du pere"
              value={this.state.nomPere}
              placeholderTextColor='#000'
              selectionColor='#000'
              keyboardType="default"
              onSubmitEditing={() => this.nomPere}
              onChangeText={nomPere => this.setState({ nomPere })}
            />
            <TextInput style={styles.inputBox}
              placeholder="nom de la mere"
              value={this.state.nomMere}
              placeholderTextColor='#000'
              selectionColor='#000'
              keyboardType="default"
              onSubmitEditing={() => this.nomMere}
              onChangeText={nomMere => this.setState({ nomMere })}
            />


          </ProgressStep>
          <ProgressStep label="Etape2" onNext={this.onNextStep2} errors={this.state.errors}>
            <Text style={styles.title}>
              OUVERTURE DU COMPTE</Text>
            <Text style={styles.text}>
              Veillez remplir le formulaire </Text>
              <Text></Text>


              <Text></Text>

            <TextInput style={styles.inputBox}
              placeholder="numero telephone"
              value={this.state.telephone}
              placeholderTextColor='#000'
              selectionColor='#000'
              keyboardType="numeric"
              onSubmitEditing={() => this.telephone}
              onChangeText={telephone => this.setState({ telephone })}
            />
            <TextInput style={styles.inputBox}
              value={this.state.boitePostal}
              placeholder="boite postal"
              placeholderTextColor='#000'
              selectionColor='#000'
              keyboardType="postal-code"
              onSubmitEditing={() => this.boitePostal}
              onChangeText={boitePostal => this.setState({ boitePostal })}
            />
            <TextInput style={styles.inputBox}
              placeholder="Email"
              // value={this.state.email}
              placeholderTextColor='#000'
              selectionColor='#000'
              keyboardType="email-address"
              onSubmitEditing={() => this.email}
              // onChangeText={email => this.setState({ email })}
              onChangeText={(email) => (
                this.setState({
                  ...this.state,
                  dataE: {
                    ...this.state.dataE,
                    emailAddress: email
                  }
                })
              )}
              value={this.state.dataE.emailAddress}

            />

            {this.isFieldInError('emailAddress') && this.getErrorsInField('emailAddress').map(errorMessage => <Text>{errorMessage}</Text>)}

            <Text>
              {this.getErrorMessages()}
            </Text>
            <ModalDropdown options={['CNI', 'PassPort', 'Titre Sejour']}
              defaultValue='Type de piece'
              dropdownStyle={styles.dropdown_2_dropdown}
              textStyle={styles.dropdown_2_text}
              style={styles.dropdown}
              onSelect={(options) => {
                this.state.displaymarred = true
                // this.setState({operator: value})
              }}
            // onSelect {...(value) => this.setState({gas: (String(this.state.options[value]))})}

            />
            <Text></Text>

            <TextInput style={styles.inputBox}
              placeholder="numéro piece"
              value={this.state.numPiece}
              placeholderTextColor='#000'
              selectionColor='#000'
              keyboardType="default"
              onSubmitEditing={() => this.numPiece}
              onChangeText={numPiece => this.setState({ numPiece })}
            />

            <ModalDropdown options={['Marie', 'Celibataire', 'Divorce']}
              defaultValue='Situation Familliale'
              dropdownStyle={styles.dropdown_2_dropdown}
              textStyle={styles.dropdown_2_text}
              style={styles.dropdown}
              onSelect={(idx, value) => { this.setState({ situationFamilliale: value }) }}

            />
            <Text></Text>

            <ModalDropdown options={['Monogamie', 'Polygamie', 'Polyandrie']}
              defaultValue='Regime matrimonial'
              dropdownStyle={styles.dropdown_2_dropdown}
              textStyle={styles.dropdown_2_text}
              style={styles.dropdown}
              onSelect={(idx, value) => { this.setState({ regimeMatrimonial: value }) }}

            />
            <Text></Text>

            <TextInput style={styles.inputBox}
              placeholder="profession"
              value={this.state.profession}
              placeholderTextColor='#000'
              selectionColor='#000'
              keyboardType="default"
              onSubmitEditing={() => this.profession}
              onChangeText={profession => this.setState({ profession })}
            />
            <ModalDropdown options={['de 0 à 250', 'de 250 à 750', 'de 750 à 1000000', '1000000 et plus']}
              defaultValue='Tranche Revenu'
              dropdownStyle={styles.dropdown_2_dropdown}
              textStyle={styles.dropdown_2_text}
              style={styles.dropdown}
              onSelect={(idx, value) => { this.setState({ trancheRevenu: value }) }}
            />
            <Text></Text>

            <TextInput style={styles.inputBox}
              placeholder="employeur"
              value={this.state.employeur}
              placeholderTextColor='#000'
              selectionColor='#000'
              keyboardType="default"
              onSubmitEditing={() => this.employeur}
              onChangeText={employeur => this.setState({ employeur })}
            />
{/* 
               <PhoneInput style={styles.inputBox}
                  placeholder="Enter phone number"
                  value={this.state.telephoneContact}
                  onChange={telephoneContact => this.setState({ telephoneContact })}/>  */}

          </ProgressStep>
          <ProgressStep label="Etape3" onNext={this.onNextStep3} errors={this.state.errors}>
            <Text style={styles.title}>
              OUVERTURE DU COMPTE
                            </Text>
            <Text style={styles.text}>
              Information sur le/la conjoint(e)
                            </Text><Text></Text>

            {this.state.situationFamilliale == 'Marie' ?
              <TextInput style={styles.inputBox}
                placeholder="nom du conjoint"
                value={this.state.nomConjoint}
                placeholderTextColor='#000'
                selectionColor='#000'
                keyboardType="default"
                onSubmitEditing={() => this.nomConjoint}
                onChangeText={nomConjoint => this.setState({ nomConjoint })}
              />
              :
              <Text>veuillez passer cette etape</Text>
            }
            {this.state.situationFamilliale == 'Marie' ?
              <TextInput style={styles.inputBox}
                value={this.state.prenomConjoint}
                placeholder="prenom du conjoint"
                placeholderTextColor='#000'
                selectionColor='#000'
                keyboardType="default"
                onSubmitEditing={() => this.prenomConjoint}
                onChangeText={prenomConjoint => this.setState({ prenomConjoint })}
              />
              :
              <Text>veuillez passer cette etape</Text>
            }
            <Text></Text>


            <Text></Text>
            {this.state.situationFamilliale == 'Marie' ?
              <TextInput style={styles.inputBox}
                placeholder="adresse"
                value={this.state.adresse}
                placeholderTextColor='#000'
                selectionColor='#000'
                keyboardType="street-address"
                onSubmitEditing={() => this.adresse}
                onChangeText={adresse => this.setState({ adresse })}
              />
              :
              <Text>veuillez passer cette etape</Text>
            }

            {this.state.situationFamilliale == 'Marie' ?
              <TextInput style={styles.inputBox}
                placeholder="telephone conjoint "
                value={this.state.telephoneConjoint}
                placeholderTextColor='#000'
                selectionColor='#000'
                keyboardType="numeric"
                onSubmitEditing={() => this.telephoneConjoint}
                onChangeText={telephoneConjoint => this.setState({ telephoneConjoint })}
              />
              :
              <Text>veuillez passer cette etape</Text>
            }

          </ProgressStep>
          <ProgressStep label="Etape4" onNext={this.onNextStep4.bind(this)} errors={this.state.errors}>
            <Text style={styles.title}>
              OUVERTURE DU COMPTE
                            </Text>
            <Text style={styles.text}>
              personne à contacter
                            </Text><Text></Text>

            <TextInput style={styles.inputBox}
              placeholder="nom contact"
              value={this.state.nomContact}
              placeholderTextColor='#000'
              selectionColor='#000'
              keyboardType="default"
              onSubmitEditing={() => this.nomContact}
              onChangeText={nomContact => this.setState({ nomContact })}
            />

            <TextInput style={styles.inputBox}
              placeholder="prenom contact"
              value={this.state.prenomContact}
              placeholderTextColor='#000'
              selectionColor='#000'
              keyboardType="default"
              onSubmitEditing={() => this.prenomContact}
              onChangeText={prenomContact => this.setState({ prenomContact })}
            />

            <TextInput style={styles.inputBox}
              placeholder="telephone contact"
              value={this.state.telephoneContact}
              placeholderTextColor='#000'
              selectionColor='#000'
              keyboardType="numeric"
              onSubmitEditing={() => this.telephoneContact}
              onChangeText={telephoneContact => this.setState({ telephoneContact })}
            />
            {/* <PhoneInput style={styles.inputBox}
                  placeholder="Enter phone number"
                  value={this.state.telephoneContact}
                  onChange={telephoneContact => this.setState({ telephoneContact })}/> */}

            {/* <TextInput  
                 placeholder="Enter Your Mobile Number"  
                 underlineColorAndroid='transparent'  
                 style={styles.TextInputStyle}  
                 keyboardType={'numeric'} 
                                           />   */}
          </ProgressStep>

          <ProgressStep label="Etape5"  onNext={this.onNextStep5.bind(this)} errors={this.state.errors}>
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

          <ProgressStep label="Etape6" >

            <MapView
              provider={PROVIDER_GOOGLE}
              width={500}
              height={500}
              // style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
              style={styles.map}
              initialRegion={this.state.region}
              showsUserLocation={true}
              onMapReady={this.onMapReady}
              onRegionChangeComplete={this.onRegionChange}>
              <MapView.Marker
                coordinate={{
                  "latitude": this.state.region.latitude,
                  "longitude": this.state.region.longitude
                }}
                title={"Your Location"}
                /*  height={10}
                 width={10} */
                // image= {{height: 20, width: 20}}
                draggable />
            </MapView>

          </ProgressStep>

          <ProgressStep label="Etape7" onSubmit={this._onLeaveMessage.bind(this)}>
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
    //height: 150,
    height: 400,
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
  },

  dropdown: {
    // margin: 10,
    //  marginBottom:10,
    // marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    // width: 80,

    height: 50,
    fontWeight: 'bold',
    // borderWidth: 1,
    borderRadius: 6,
    // fontSize: 20,
  }, dropdown_2_text: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontWeight: 'bold',

    fontSize: 16,


    textAlign: 'center',
    textAlignVertical: 'center',

  },
  dropdown_2_dropdown: {
    width: 100,
    // height: 80,
    // height:40,


    // marginBottom:20,
    borderWidth: 2,
    borderRadius: 3,
  },
  dropdown_2_row: {

    flexDirection: 'row',
    // marginBottom:20,
    height: 100,
    alignItems: 'center',
    marginHorizontal: 4,
    // fontSize: 20,


    textAlignVertical: 'center',
  },
  dropdown_label: {

    fontSize: 14,
    padding: 10,


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