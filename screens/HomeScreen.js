import { View, Platform, Animated, ScrollView, Text, TouchableOpacity } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'

import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import { loggedUser, selectLog } from '../reducer/profileSlice'

import { styles } from '../fontStyles'
import * as Icons from 'react-native-heroicons/outline'

import HeadBar from '../components/Home/HeadBar'
import PromoCard from '../components/Home/PromoCard'

import CategoryRow from '../components/Home/CategoryRow'
import SectionRow from '../components/Home/SectionRow'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeScreen = () => {

  let offset = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation()
  const dispatch = useDispatch()
  const logUser = useSelector(selectLog)

  useEffect(() => {
    if(!logUser){
      AsyncStorage.getItem('_data-user').then((response) => {
        if (response !== null) {
          dispatch(loggedUser(JSON.parse(response)))
        }
      })
    }
  }, [])

  return (
    <View className='w-screen bg-white'>
      {/** Header Section */}
      <HeadBar offset={offset} className='relative' />

      <ScrollView
        bounces={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset}}}],
          {useNativeDriver: false}
        )}
        contentContainerStyle={
        Platform.OS === 'ios' ? 
        {
          marginTop: 120,
          paddingBottom: 150,
        } :
        {
          marginTop: 120,
          paddingBottom: 150,
        }}
        className='bg-gray-100'
      >
        {/** Promo Card Section */}
        <PromoCard />

        {/** Section */}
        <CategoryRow />

        {/** Alert */}
        {
          logUser === false ?
          <View className='w-screen px-4 mb-4'>
            <View className='bg-blue-100 p-6 rounded-xl'>
              <View className='flex-row space-x-1 items-center'>
                <Icons.InformationCircleIcon className='text-blue-500' />
                <Text style={styles.Semi} className='text-base text-blue-500'>Selamat datang kembali!</Text>
              </View>
              <View className='my-2'>
                <Text style={styles.Regu} className='text-sm'>Untuk pengalaman penggunaan aplikasi GeoID yang lebih baik, silahkan login terlebih dahulu</Text>
              </View>
              <TouchableOpacity
                  onPress={() => navigation.navigate('Login')}
                  className='w-fit border-2 border-blue-500 mt-2 py-2 items-center rounded-full'
                >
                  <Text style={styles.Semi} className='text-blue-500'>Login yuk!</Text>
                </TouchableOpacity>
            </View>
          </View> : null
        }

        <SectionRow />
      </ScrollView>

    </View>
  )
}

export default HomeScreen