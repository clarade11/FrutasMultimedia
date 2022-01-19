import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState, useEffect } from 'react';
import { FlatList, Text, View , Button} from 'react-native';

const Tab = createBottomTabNavigator();

import FrigorificoPantalla from './src/containers/FrigorificoPantalla';
import AnadirPantalla from './src/containers/AnadirPantalla';

function App() {
  //--------ELEMENTOS DE LA PANTALLA-------
  return (
    //tab para navegacion abajo, o que nunca va a cambiar

    <NavigationContainer>

      <Tab.Navigator //LOS ICONOS DE LAS PANTALLAS PRINCIPALES DEL MENU
        
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => { //ICONOS
            let iconName;
            if (route.name === 'Historia') {
              iconName = focused ? 'ios-folder-open-outline' : 'ios-folder'; //pongo el outline cuando está ese tab pulsado, porque mola mas
            } else if (route.name === 'Usuarios') {
              iconName = focused ? 'ios-body-outline' : 'ios-body';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#125653',
          tabBarInactiveTintColor: 'black',
          tabBarActiveBackgroundColor:'#CAFBF9'
        }
        
        )}
      >
        
        
      <Tab.Screen options={{ headerShown: false }} name="Frigorifico" component={FrigorificoPantalla}
      options={{
        title: 'Frigorífico',
        headerStyle: {
          backgroundColor: 'red',
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center'
      }}/>
      
      <Tab.Screen options={{ headerShown: false }} name="Anadir" component={AnadirPantalla}
      options={{
        title: 'Añade una fruta',
        headerStyle: {
          backgroundColor: 'blue',
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center'
      }}/>


      </Tab.Navigator>
    </NavigationContainer>


  )
}
export default App;



