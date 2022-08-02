import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function TaskManager ({ data, deleteItem, editItem }) {
  return (
    <View style={styles.box}>
      <TouchableOpacity style={{ marginRight: 10 }} onPress={() => deleteItem(data.key)}>
        <Icon name="trash" color="red" size={20} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.editBtn} onPress={() => editItem(data)}>
      <Text style={styles.taskText}>{data.nome}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  box: {
    backgroundColor: '#121212',
    flexDirection: 'row',
    marginTop: 30,
    maxHeight: 100,
    minHeight: 55,
    padding: 15,

  },
  taskText: {
    color: 'white',
    fontSize: 16,
    marginRight: 20
  },
  editBtn: {
    minHeight: 55,
    maxHeight: 100,
    position: 'absolute',
    marginLeft: 50,
    width: '100%',
    justifyContent: 'center'
  }
});