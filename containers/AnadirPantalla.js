import React, { useState, useEffect } from 'react';
import { Button, Text, View , TextInput, Alert} from 'react-native';
import styles from '../styles/Styles';
import ModalDropdown from 'react-native-modal-dropdown';

export default function AnadirPantalla() {
    const[nombre, setNombre] = useState(null);
    const[precio, setPrecio] = useState(null);
    const data=['Piña', 'Manzana','Melocotón', 'Uvas','Naranja','Kiwi','Plátano','Pera'];
   

    //--------ELEMENTOS DE LA PANTALLA-------
    return (
        <View>
        <Text > Nombre de la fruta </Text> 
  
        <ModalDropdown style={styles.input} textStyle={styles.opciones} 
        options={data}

        onSelect={(id, nombre) => setNombre(nombre)}/>
        
        <Text> Precio de la fruta </Text> 
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
              setNombre(null);
              setPrecio(null);
            })
            .catch(error=> console.log(error));
           }}
      />
      </View>
  
    )
  }