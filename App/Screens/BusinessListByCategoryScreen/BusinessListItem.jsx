import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function BusinessListItem({business,booking}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.container} onPress={()=>navigation.push('business-detail',
    {
      business:business
    }
    )}>
      <Image source={{uri:business?.images[0]?.url}}
        style={styles.image}
      />
      <View style={styles.subcontainer}>
        <Text style={{fontFamily: 'outfit', color:Colors.GRAY, fontSize:15}}>{business?.contactPerson}</Text>
        <Text style={{fontFamily: 'outfit-medium', fontSize:19}}>{business?.name}</Text>

        {!booking?.id? <Text style={{fontFamily: 'outfit', color:Colors.GRAY, fontSize:16}}>
        <Entypo name="location" size={17} color={Colors.PRIMARY}/>
            {business?.address}</Text> 
        :
        <Text style={[{padding:5, borderRadius:5, fontSize:14, alignSelf:'flex-start'},
        booking?.bookingStatus=='Completed'?
        {backgroundColor: Colors.LIGHT_GREEN, color:Colors.GREEN}:
        booking?.bookingStatus=='Canceled'?
        {backgroundColor: Colors.LIGHT_RED, color:Colors.RED}:
        {color:Colors.PRIMARY, backgroundColor:Colors.PRIMARY_LIGHT}]}>
          {booking?.bookingStatus}</Text>
        } 
        {booking?.id?
        <Text style={{fontFamily: 'outfit', color:Colors.GRAY, fontSize: 16}}>
          <AntDesign name="calendar" size={24} color={Colors.PRIMARY} style={{marginRight: 15}}/>
            {booking.date} at {booking.time}</Text>
            :null}
      </View>
    </TouchableOpacity>
  ) 
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.WHITE,
        padding:10,
        borderRadius: 15,
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    subcontainer:{
        display: 'flex',
        gap: 7
    },
    image:{
        width: 100,
        height: 100
    }
})