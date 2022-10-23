import { View, TextInput, TouchableOpacity, Animated } from 'react-native'
import React, { useEffect } from 'react'

import { useNavigation } from '@react-navigation/native'

import * as Icons from 'react-native-heroicons/solid'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { useSelector } from 'react-redux'
import { selectLog } from '../../reducer/profileSlice'

const HeadBar = ({offset}) => {

  const navigation = useNavigation()
  const logUser = useSelector(selectLog)

  const diffClamp = Animated.diffClamp(offset, 0, 100);

  const translateY = diffClamp.interpolate({
    inputRange: [25, 50, 100],
    outputRange: [0, -50, -100],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        transform: [{translateY}],
      }}
    >
      <View className='bg-white pt-10 border-b border-[#009245]'>
        <View className='flex-row pb-4 px-4 space-x-2'>
          <View className='flex-row w-80 bg-gray-100 items-center rounded-full'>
            <View className='left-4'>
              <Icons.MagnifyingGlassIcon fill={'#009245'} size={24} />
            </View>
            <TextInput
              placeholder='Cari produk...'
              className='flex-1 mx-3 p-2'
            />
          </View>
          <TouchableOpacity
            className='p-2 flex-1 items-center'
            onPress={() => {
              if(logUser === false){
                navigation.navigate('Login')
              } else {
                navigation.navigate('Cart')
              }
            }}
          >
            <Icons.ShoppingCartIcon fill={'#009245'} size={28} />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  )
}

export default HeadBar