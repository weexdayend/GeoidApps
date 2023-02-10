import { View, Text, Image, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'

import * as Animatable from 'react-native-animatable'
import { styles } from '../fontStyles'
import { useNavigation } from '@react-navigation/native'

import { useDispatch } from 'react-redux'
import { clearAll } from '../reducer/cartSlice'

const PlacingScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearAll())
    setTimeout(() => {
      navigation.navigate('Order')
    }, 5000)
  }, [])

  return (
    <Animatable.View animation={'slideInUp'}>
    <ImageBackground
      source={require('../assets/img/large-triangles.png')}
      className='w-screen h-screen'
    >
      <View className='w-screen h-screen items-center'>
        <View className='top-24 items-center p-8'>
          <Image
            source={require('../assets/img/sammy-shopping.gif')}
          />

          <Text style={styles.Bold} className='text-4xl text-[#ffffff] mt-4'>Pesanan kamu sedang di proses!</Text>
        </View>
      </View>
    </ImageBackground>
    </Animatable.View>
  )
}

export default PlacingScreen