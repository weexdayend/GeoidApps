import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground } from 'react-native'
import React from 'react'

import * as Icons from 'react-native-heroicons/solid'
import { styles } from '../fontStyles'

import { useNavigation } from '@react-navigation/native'

const OrderScreen = () => {

  const navigation = useNavigation()

  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../assets/img/large-triangles.png')}
        className='w-screen h-screen'
      >
        <ScrollView className='w-screen h-screen'>
          <View className='w-screen h-screen'>
            <View className='items-center top-14 p-2'>
              <Text style={styles.Bold} className='text-3xl text-white'>Detail Transaksi</Text>
              <Text style={styles.Regu} className='text-white text-sm mt-1'>Booking ID #123123</Text>
            </View>
            
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className='absolute top-16 p-2 right-4 bg-white rounded-full'
            >
              <Icons.XMarkIcon fill={'#009245'} />
            </TouchableOpacity>

            <View className='h-screen w-screen top-20 p-4'>
              <View className='p-4 bg-white rounded-xl py-6 shadow-lg'>
                <View className='flex-row items-center justify-between border-b border-gray-300 pb-4'>
                  <View className='space-x-4s'>
                    <Text className='text-base text-gray-500'>Status</Text>
                    <Text className='text-base'>Order sedang di proses</Text>
                  </View>

                  <Text className='text-base text-[#009245]'>Lihat detail</Text>
                </View>

                <View className='flex pt-4'>
                  <Text className='text-base text-gray-500'>Tanggal Transaksi</Text>
                  <Text className='text-base'>11 September 2022</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default OrderScreen