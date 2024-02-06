import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import { Entypo } from '@expo/vector-icons';
import BusinessPhotos from './BusinessPhotos';
import BusinessAboutMe from './BusinessAboutMe';
import BookingModal from './BookingModal';

export default function BusinessDetailsScreen() {
  const param = useRoute().params;
  const [business,setBusiness] = useState(param.business);
  const navigation = useNavigation();
  const [isReadMore, setIsReadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);      
  useEffect(()=>{
    // console.log(param?.business)
    // param&&setBusiness();
  },[])

  const onMessageBtnClick=()=>{
    Linking.openURL('mailTo:'+business?.email+'?subject= I am looking for your Service&body =Hi There,');
  }
  return business&&(
    <View>
      <ScrollView style={{height: '89 %'}}>
        <TouchableOpacity style={styles.backBtnContainer} onPress={()=> navigation.goBack()}> 
          <Ionicons name="arrow-back-outline" size={30} color="black" />
        </TouchableOpacity>
        <Image source={{uri:business?.images[0]?.url}}
          style={{width: '100%',height:300}}
        />
        <View style={styles.infoContainer}>
          <Text style={{fontFamily: 'outfit-bold', fontSize:25}}>{business?.name}</Text>
          <View style={styles.subContainer}>
            <Text style={{fontFamily: 'outfit-medium',fontSize:20,color:Colors.PRIMARY}}>{business?.contactPerson} 🌟 </Text>
            <Text style={{color:Colors.PRIMARY, backgroundColor:Colors.PRIMARY_LIGHT, padding:5, borderRadius: 5, fontSize:14}}>{business?.category.name}</Text>
          </View>
          <Text style={{fontSize: 17, fontFamily: 'outfit', color: Colors.GRAY}}>
          <Entypo name="location" size={17} color={Colors.PRIMARY}/>
            {business?.address}
          </Text>
          {/* Horizontal line */}
          <View style={{borderWidth: 0.4,borderColor:Colors.GRAY,marginTop: 20, marginBottom: 20}}></View>
          {/* About me section */}
          <BusinessAboutMe business={business}/> 
          {/* Horizontal line */}
          <View style={{borderWidth: 0.4,borderColor:Colors.GRAY,marginTop: 20, marginBottom: 20}}></View>
          <BusinessPhotos business={business}/>
        </View>
      </ScrollView>
      <View style={{display: 'flex', flexDirection: 'row', margin: 10, gap: 6}}>
        <TouchableOpacity style={styles.messagebtn} onPress={()=> onMessageBtnClick()}>
          <Text style={{
            textAlign: 'center',
            fontFamily: 'outfit-medium',
            color: Colors.PRIMARY,
            fontSize: 18
          }}>
            Message
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookingbtn} 
          onPress={()=> setShowModal(true)}
        >
          <Text style={{
            textAlign: 'center',
            fontFamily: 'outfit-medium',
            color: Colors.WHITE,
            fontSize: 18,
          }}>
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
      {/* Booking Screen Modal */}
      <Modal 
        animationType='slide'  
        visible={showModal}
      >
        <BookingModal 
        businessId={business.id}
        hideModal={()=> setShowModal(false)}/> 
      </Modal>
    </View>
  )
}
const styles = StyleSheet.create({
  backBtnContainer:{
    position: 'absolute',
    zIndex: 10,
    padding: 20
  },
  infoContainer:{
    display: 'flex',
    gap: 7,
    padding: 20
  },
  subContainer:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7
  }, 
  messagebtn:{
    padding: 17,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    textAlign: 'center',
    flex: 1
  },
  bookingbtn:{
    padding: 17,
    backgroundColor: Colors.PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    flex: 1
  }
})