import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation} from '@react-navigation/native'  

export default function PageHeading({title}) {
    const navigation =useNavigation();
  return (
    <TouchableOpacity style={styles.header} onPress={()=> navigation.goBack()}>
        {/* <Ionicons name="arrow-back-outline" size={30} color="black"/> */}
        <Text style={{fontFamily:'outfit-medium',fontSize: 25}}>{title}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    header:{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10
    }
  })