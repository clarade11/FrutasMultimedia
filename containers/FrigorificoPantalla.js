import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, Image, RefreshControl } from 'react-native';

import styles from '../styles/Styles';

//useeffect= cuando se renderiza el programa se hace esa funcion y hace cambios en la pantalla.
//(Se usa para llamar a apis)
// hay que ponerle =>>>  ,[])  y así termina, si no se pone entraría en bucle. 
//Si quisieramos x veces se pondría el valor dentro de los corchetes
//el fetch sirve para llamar a las apis

//PANTALLA LISTADO
export default function FrigorificoPantalla() {
  const [fruits, setFruits] = useState(null);
  const [refrescar, setRefrescar] = useState(null);
  const [cargando, setCargando] = useState(null);

  function filtroImagen(fruta) {
    if ('Piña' === fruta) return <Image
      source={require('../assets/piña.jpg')}
    />
    else if ('Manzana' === fruta) return <Image
      source={require('../assets/manzana.jpg')}
    />
    else if ('Melocotón' === fruta) return <Image
      source={require('../assets/melocoton.jpg')}
    />
    else if ('Uvas' === fruta) return <Image
      source={require('../assets/uvas.jpg')}
    />
    else if ('Naranja' === fruta) return <Image
      source={require('../assets/naranja.jpg')}
    />
    else if ('Kiwi' === fruta) return <Image
      source={require('../assets/kiwi.jpg')}
    />
    else if ('Plátano' === fruta) return <Image
      source={require('../assets/platano.jpg')}
    />
    else if ('Pera' === fruta) return <Image
      source={require('../assets/pera.jpg')}
    />
  }

  const espera = (tiempo) => {
    return new Promise(resolve => {
      setTimeout(resolve, tiempo);
    });
  }

  const onRefresh = React.useCallback(() => {
    setRefrescar(true);
    espera(2000).then(() => setRefrescar(false), getFrutas())
  }, []);

  function getFrutas() {
    fetch("http://10.0.2.2:8080/fruits")
      .then(response => response.json())
      .then((responseJson) => {
        console.log('getting data from fectch', responseJson);
        setFruits(responseJson)
      })
      .catch(error => console.log(error))

  }
  //siempre igual
  useEffect(() => {
    getFrutas
  }, []);

  const renderizarItem = ({ item }) => (
    <View>
      <Text>Las frutas disponibles son:</Text>
      {filtroImagen(item.name)}
      <Text style={styles.letraGordita}>Nombre: {item.name}       Precio: {item.price}</Text>

    </View>
  );
  if (cargando) {
    return (<Text>Cargando...</Text>)
  } else {

  }

  //--------ELEMENTOS DE LA PANTALLA-------
  return (
    <FlatList
      data={fruits}
      renderItem={renderizarItem}
      keyExtractor={item => item.id}
      refreshControl={
        <RefreshControl
          refreshing={refrescar}
          onRefresh={onRefresh}
        />
      }
    />

  )
}