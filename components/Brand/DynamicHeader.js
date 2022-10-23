import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TextInput, View, TouchableOpacity, Animated } from 'react-native';

import * as Icons from 'react-native-heroicons/solid'

const DynamicHeader = ({animHeaderValue}) => {

  const animateHeaderBackgroundColor = animHeaderValue.interpolate({
    inputRange: [25, 50, 100],
    outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.95)'],
    extrapolate: 'clamp'
  })
  
  const navigation = useNavigation()

  return (
    <Animated.View 
      style={{
        zIndex: 10,
        backgroundColor: animateHeaderBackgroundColor,
      }}
      className='absolute w-screen h-20 p-4'
    >
      <View className='flex-row items-center space-x-4'>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className='p-3 bg-[#009245] rounded-full mr-1'
        >
          <Icons.ArrowLeftIcon fill={'#ffffff'} />
        </TouchableOpacity>

        <View className='flex-row flex-1 bg-white items-center rounded-full border border-[#009245]'>
          <View className='left-4 mr-2'>
            <Icons.MagnifyingGlassIcon fill={'#009245'} />
          </View>
          <TextInput
            placeholder='Cari produk...'
            className='flex-1 mx-3'
          />
        </View>
      </View>       
    </Animated.View>
  )
}

export default DynamicHeader