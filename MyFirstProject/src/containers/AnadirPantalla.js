import React, { useState, useEffect } from 'react';
import { Button, TouchableOpacity,Image, Text,ImageBackground, View , TextInput, Alert} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import styles from '../styles/Styles';



export default function AnadirPantalla() {
    const[nombre, setNombre] = useState(null);
    const[precio, setPrecio] = useState(null);

    //--------ELEMENTOS DE LA PANTALLA-------
    return (
        <ImageBackground style={ styles.imagenfondo } 
        resizeMode='cover' 
        source={require('../assets/frutasfondo.jpg')}>
        <View style={styles.viewfrutas}> 
        <Text style={styles.enunciado} > Nombre de la fruta </Text> 

        <ModalDropdown style={styles.input} textStyle={styles.opciones}
        options={['Piña', 'Manzana','Melocotón', 'Uvas','Naranja','Kiwi','Plátano','Pera']}
        onSelect={(id, nombre) => setNombre(nombre)}/>

        <Text style={styles.enunciado} > Precio de la fruta </Text> 
        <TextInput
            style={styles.input}
            onChangeText = {precio => setPrecio(precio)}
        />
        <Button
          title="Enviar"
          onPress={() =>{
            fetch('http://10.0.2.2:8080/fruits', {
              method:'POST',
              headers:{
                Accept: 'application/json','Content-Type' : 'application/json',
              },
              body:JSON.stringify({
                "name": nombre,
                "price":precio  
              }),
            })
            .then((responseJson)=>{
              console.log('getting data from fectch', responseJson);
              Alert.alert("Fruta añadida correctamente");
              setFruits(null);
              setPrice(null);
            })
            .catch(error=> console.log(error));
           }}
      />
      </View>
      </ImageBackground>
  
    )
  }