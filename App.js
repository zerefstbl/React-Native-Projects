import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'firebase';

let firebaseConfig = {
  apiKey: "AIzaSyCCemgU9nJTz7fc9HckvOTQLfUhwaqN54o",
  authDomain: "meuapp-e9587.firebaseapp.com",
  databaseURL: "https://meuapp-e9587-default-rtdb.firebaseio.com",
  projectId: "meuapp-e9587",
  storageBucket: "meuapp-e9587.appspot.com",
  messagingSenderId: "667919190974",
  appId: "1:667919190974:web:0d4b26165e5d381ee787ef",
  measurementId: "G-1K3DM0RXHW"
};

export default function App () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
  }, [])

  async function handleClick() {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password).then((value) => {
        alert('Cadastrou!!')
        setEmail('');
        setPassword('');
        setError(null);
      }).catch(err => {
        if (err.code === 'auth/weak-password') {
          setError('Password deve ter no minimo 6 caracteres!')
          Keyboard.dismiss();
          return;
        } else if(error.code === 'auth/invalid-email') {
          setError('Email inválido!')
          Keyboard.dismiss();
          return;
        } else {
          setError('Algo deu errado!')
          Keyboard.dismiss();
          return;
        }
      })
    } catch(err) {
      setError('Algo deu erado');
      console.log(err.message);
      Keyboard.dismiss()
      return;
    }
  }

  return (
    <View style={styles.container}>

      <ImageBackground resizeMode='cover' style={styles.image} source={{ uri: 'https://i.pinimg.com/originals/09/2c/a4/092ca4c95684f69ff7b280da31a0fee8.jpg' }}>
        <Image 
        style={{ height: '27%', width: '100%', marginTop: 60 }}
        resizeMode='cover'
        source={{ uri: 'https://www.pngkey.com/png/full/21-219729_logo-nsd-black-label-logo.png' }}
        />

        <View style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', marginTop: 40 }}>
          {error && <Text style={{ color: 'red' }}>{error}</Text>}
        <TextInput 
        placeholder="Email"
        style={styles.input}
        placeholderTextColor='white'
        onChangeText={(text) => setEmail(text)}
        />
        <TextInput 
        placeholder="Password"
        style={styles.input}
        placeholderTextColor='white'
        onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity style={styles.btn} onPress={handleClick}>
        <LinearGradient 
        start={{ x: 0.7, y: 0 }} 
        colors={['#813400', '#190a05']} 
        style={{ height: 45, borderRadius: 100, padding: 12, opacity: 0.8 }}>
          <Text style={styles.btnText}>Sign In</Text>
        </LinearGradient>
        </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  input: {
    fontSize: 16,
    borderColor: '#999',
    borderWidth: 1,
    width: '80%',
    borderRadius: 100,
    marginTop: 20,
    padding: 15,
    height: 50,
    backgroundColor: '#333',
    opacity: 0.6,
    color: 'white'
  },
  btn: {
    width: '80%',
    borderRadius: 100,
    height: 45,
    marginTop: 40,
  },
  btnText: {
    color: 'white',
    textAlign: 'center'
  }
});