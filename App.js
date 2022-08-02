import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Keyboard } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import firebase from './src/database/firebaseConnection';
import TaskManager from './src/TaskManager';

export default function App () {
  const inputRef = useRef(null);
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('null');
  const [key, setKey] = useState('');

  useEffect(() => {
    async function handleList() {
      await firebase.database().ref('tarefas').on('value', (snapshot) => {
        setTasks([]);
        snapshot.forEach((item) => {
          let data = {
            key: item.key,
            nome: item.val().nome
          };
          setTasks(oldArray => [...oldArray, data]);
        })
      })
    }

    handleList()
  }, [])  

  async function handleClick() {
    if (key !== '') {
      await firebase.database().ref('tarefas').child(key).update({
        nome: task
      });
      Keyboard.dismiss();
      setTask('');
      setKey('');
      return;
    }

    let tarefas = await firebase.database().ref('tarefas');
    let chave = tarefas.push().key;
    tarefas.child(chave).set({
      nome: task
    })

    Keyboard.dismiss();
    setTask('');
  }

  async function deletar(key) {
    await firebase.database().ref('tarefas').child(key).remove()
  }

  function handleEdit(data) {
    setTask(data.nome);
    setKey(data.key);
    inputRef.current.focus();
  }

  function cancelEdit() {
    setKey('');
    Keyboard.dismiss();
    setTask('');
  }

  return (
    <View style={styles.container}>
      
      {key.length > 0 && 
      <View style={{ flexDirection: 'row', marginBottom: 20, justifyContent: 'center' }}>
      <TouchableOpacity onPress={cancelEdit}>
        <Icon name="x-circle" size={30} color="red" />
      </TouchableOpacity>
      <Text style={{ marginLeft: 8, marginBottom: 10, color: 'red', textAlign: 'center' }}>
        Você esta editando uma tarefa!
      </Text>
      <Text style={{ position: 'absolute', marginTop: 17 }}>
        Clique no X para cancelar
      </Text>
    </View>
      }


      <View style={styles.containerTask}>
      <TextInput 
      value={task}
      onChangeText={(text) => setTask(text)}
      underlineColorAndroid='transparent'
      placeholder='O que vamos fazer hoje?'
      style={styles.input}
      ref={inputRef}
      />
      <TouchableOpacity style={styles.btnAdd} onPress={handleClick}>
        <Text style={styles.btnText}>
          +
        </Text>
      </TouchableOpacity>
      </View>

      <FlatList 
      data={tasks}
      keyExtractor={(item) => item.key.toString()}
      renderItem={({ item }) => <TaskManager data={item} deleteItem={deletar} editItem={handleEdit} />}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    marginLeft: 10,
    marginRight: 10
  },
  containerTask: {
    flexDirection: 'row'
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#121212',
    height: 40
  },
  btnAdd: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#121212',
    paddingLeft: 14,
    paddingRight: 14,
    marginLeft: 4 
  },
  btnText: {
    color: 'white',
    fontSize: 20
  }
});