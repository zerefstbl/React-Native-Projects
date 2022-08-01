import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Keyboard } from 'react-native';
import Picker from './src/components/Picker';
import api from './src/services/api';

export default function App () {
  const [moedas, setMoedas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  const [moeda, setMoeda] = useState(null);

  const [moedaBValor, setMoedaBValor] = useState(0);

  const [valorMoeda, setValorMoeda] = useState(null);
  const [valorConvertido, setValorConvertido] = useState(0);

  useEffect(() => {
    async function loadMoedas() {
      const response = await api.get('all');
      
      let arrayMoedas = [];
      Object.keys(response.data).map((key) => {
        arrayMoedas.push({
          key: key,
          label: key,
          value: key
        })
      });

      setMoedas(arrayMoedas);
      setLoading(false);
    }
    loadMoedas();
  }, [])

  async function converter() {
    if (!moeda) {
      setError('Nenhuma moeda selecionada!!')
      return;
    }

    if (moedaBValor === 0) {
      setError('Digite um valor válido!')
      return;
    }
    setError('');
    const response = await api.get(`all/${moeda}-BRL`);
    
    let resultado = (response.data[moeda].ask * parseFloat(moedaBValor));

    setValorConvertido(`R$ ${resultado.toFixed(2)}`);
    
    setValorMoeda(moedaBValor);
  
    Keyboard.dismiss();
  }

  if (loading) {
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color="white" size={45} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.areaMoeda}>
        <Text style={styles.titulo}>Seleciona sua moeda</Text>
        <Picker data={moedas} onChange={(moeda) => setMoeda(moeda)} />  
      </View>

    <View style={styles.areaValor}>
      <Text style={styles.titulo}>Digite um valor para converter em (R$)</Text>
      <TextInput 
      placeholder="EX: 150"
      style={styles.input}
      keyboardType='numeric'
      onChangeText={(valor) => setMoedaBValor(valor)}
      />
    </View>

    <TouchableOpacity style={styles.botaoArea} onPress={converter}>
      <Text style={styles.botaoTexto}>Converter</Text>
    </TouchableOpacity>

    {error && <Text style={{ marginTop: 30, color: 'red' }}>{error}</Text>}

    {valorConvertido !== 0 && (
      <View style={styles.areaResultado}>
        <Text style={styles.valorConvertido}>{valorMoeda} {moeda}</Text>
        <Text style={styles.valorConvertido}>Corresponse a:</Text>
        <Text style={styles.valorConvertido}>{valorConvertido}</Text>
      </View>
    )}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgrondColor: '#101215',
    paddingTop: 40
  },
  areaMoeda: {
    width: '90%',
    paddingTop: 9,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    marginBottom: 1,
    borderWidth: 1
  },
  titulo: {
    fontSize: 17,
    paddingTop: 5,
    paddingLeft: 17
  },
  areaValor: {
    width: '90%',
    borderWidth: 1,
    borderTopWidth: 0,
    paddingBottom: 9,
    paddingTop: 9    
  },
  input: {
    width: '100%',
    padding: 10,
    height: 45,
    fontSize: 17,
    marginTop: 9,
    marginLeft: 7
  },
  botaoArea: {
    width: '90%',
    height: 45,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD700'
  },
  botaoTexto: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  areaResultado: {
    width: '90%',
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25
  },
  valorConvertido: {
    fontSize: 26,
    fontWeight: 'bold'
  }
})