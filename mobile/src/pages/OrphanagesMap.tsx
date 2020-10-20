import React, {useEffect, useState} from 'react';

import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, {Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import mapMarker from '../images/map-marker.png';
import {Feather} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Orphanage{
  id: number;
  about: string;
  latitude: number;
  longitude: number;
  name: string
}

export default function OrphanagesMap(){

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    const navigation = useNavigation(); 

    useEffect(() => {
      api.get('orphanages').then(response => {
        setOrphanages(response.data);
      });
    }, []);

    function handleNavigateToOrphanageDetails (id:number){
      navigation.navigate('OrphanageDetails', {id});
    }

    function handleNavigateToCreateOrphanage (){
      navigation.navigate('SelectMapPosition');
    }


    return(
        <View style={styles.container}>
        <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map} 
        initialRegion={{
          latitude: -22.9355626,
          longitude: -45.4614528,
          latitudeDelta: 0.008 ,
          longitudeDelta: 0.008
        }}
        >
          {orphanages.map(orphanages => {
            return (
              <Marker 
              icon={mapMarker}
              key={orphanages.id}
              calloutAnchor={{
              x: 2.7,
              y: 0.8
              }}
              coordinate={{
                latitude: orphanages.latitude,
                longitude: orphanages.longitude
                }}
              >
                <Callout tooltip={true} onPress={() => handleNavigateToOrphanageDetails(orphanages.id)}>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>{orphanages.name}</Text>
                  </View>
                </Callout>
              </Marker>
            );
          })}
        </MapView>
  
         <View style={styles.footer}>
            <Text style={styles.footerText}> {orphanages.length} Orfanatos encontrados</Text>
  
            <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
              <Feather name="plus" size={20} color={'#fff'} ></Feather>
            </RectButton>
  
         </View>    
  
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
  
    map:{
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  
    calloutContainer:{
      width: 160,
      height: 40,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255,255,255,0.8)',
      borderRadius: 16,
      justifyContent: 'center',
      
      elevation: 3
    },
  
    calloutText:{
      color: '#0089a5',
      fontSize: 14,
      fontFamily: 'Nunito_700Bold'
    },
  
    footer:{
      position: "absolute",
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#fff',
      borderRadius: 20,
      height: 44,
      paddingLeft: 24,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
  
      elevation: 3
    },
  
    footerText:{
      color: '#8fa7b3',
      fontFamily: 'Nunito_700Bold'
    },
  
    createOrphanageButton:{
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center"
    }
  
  });
  