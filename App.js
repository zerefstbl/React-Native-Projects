import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import api from './src/services/api';

import Filmes from './src/Filmes';

export default function App () {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function LoadFilmes () {
      const response = await api.get('r-api/?api=filmes');
      setFilmes(response.data);
      setLoading(false)
    }
    LoadFilmes();
  }, [])


  if (loading) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator color='#121212' size={45} />
      </View>
    );
  }
  return(
    <View style={styles.container}>
      <FlatList 
      keyExtractor={item => String(item.id)}
      data={filmes}
      renderItem={({ item }) => <Filmes data={item} /> }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});