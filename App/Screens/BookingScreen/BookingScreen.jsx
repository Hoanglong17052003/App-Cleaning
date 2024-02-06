import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import PageHeading from '../../Components/PageHeading'
import GlobalApi from './../../Utils/GlobalApi'
import { useUser } from '@clerk/clerk-expo'
import BusinessListItem from './../BusinessListByCategoryScreen/BusinessListItem'

export default function BookingScreen() {

  const {user} =useUser();
  const [bookingList,setBookingList] =useState([]);
  const [loading,setLoading] =useState(false);

  useEffect(()=>{
    user&&getUserBookings();
  },[user])
   
  const getUserBookings=()=>{
      setLoading(true)
      GlobalApi.getUserBookings(user.primaryEmailAddress.emailAddress).then(resp=>{
      // console.log(resp);
      setBookingList(resp.bookings);
      setLoading(false)
    })
  }

  return (
    <View style={{padding: 20}} >
      <PageHeading title={'My bookings'}/>
      <View>
        <FlatList
          data={bookingList}
          onRefresh={()=>getUserBookings()}
          refreshing={loading}
          renderItem={({item,index})=>(
            <BusinessListItem 
            business={item?.businessList}
            booking={item}
            />
          )}
        />
      </View> 
    </View>
  )
} 